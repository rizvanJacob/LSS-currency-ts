import { Account, JWT_EXPIRIES } from "../constants";
import client from "../config/sgid";
import { prisma } from "../config/database";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UPDATED } from "../server";

type User = {
  id: number;
  displayName: string;
  authCategory?: number;
  accountType: number;
  approved: boolean;
  trainee?: {
    id: number;
  };
};

const AUTHORISE = true;

const JWT_SECRET = process.env.JWT_SECRET as string;
const CLIENT_URL = process.env.CLIENT_URL + "/";

const generateUrl = async (req: Request, res: Response) => {
  console.log("clientUrl: ", CLIENT_URL);
  const login = client.authorizationUrl(
    "login",
    "openid",
    null,
    CLIENT_URL
  ).url;

  const checkin = client.authorizationUrl(
    "checkin",
    "openid",
    null,
    CLIENT_URL
  ).url;

  res.status(200).json({ login, checkin, updated: UPDATED });
};

const login = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const { sub: openId } = await client.callback(
      code as string,
      null,
      CLIENT_URL
    );
    try {
      const userData = await prisma.userModel.findUniqueOrThrow({
        where: { openId } as any,
        select: {
          id: true,
          displayName: true,
          authCategory: true,
          accountType: true,
          approved: true,
          trainee: {
            select: {
              id: true,
            },
          },
        },
      });
      if (userData.approved) {
        const jwtExpiry = JWT_EXPIRIES[userData.accountType as Account];
        const token = jwt.sign(userData, JWT_SECRET, {
          expiresIn: jwtExpiry,
        });
        res.status(200).json({ token });
      } else {
        res.status(400).json({
          alert: "Your requested account has not been approved",
        });
      }
    } catch (error: any) {
      const prismaError = error as PrismaClientKnownRequestError;
      if (prismaError.code === "P2025") {
        res.status(404).json(openId);
      } else {
        res.status(500);
      }
    }
  } catch (error) {
    //SG ID client unavailable
    console.log(error);
    res.status(500);
  }
};

const findUser = async (req: Request, res: Response) => {
  const { openId } = req.params;

  const userData = await prisma.userModel.findUniqueOrThrow({
    where: { openId } as any,
    select: {
      id: true,
      displayName: true,
      authCategory: true,
      accountType: true,
    },
  });

  const token = jwt.sign(userData, JWT_SECRET, { expiresIn: "1h" });
  res.json(token);
};

const isAuth =
  (authorized: number[], generalAccess = false) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (!AUTHORISE) {
      return next();
    }
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1].toString();
    const traineeId = Number(req.params.traineeId);
    const userId = Number(req.params.userId);
    const trainingId = Number(req.params.trainingId);
    const requirementId = Number(req.params.requirementId);
    //   console.log("userId", userId);
    //   console.log("traineeId", traineeId);

    try {
      if (!token) {
        throw new Error("No token provided");
      }

      const verifiedUser = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string
      ) as User;
      req.headers.authorization = JSON.stringify(verifiedUser);

      //attempt to access as trainee
      if (verifiedUser.trainee?.id) {
        console.log("Verifying trainee access...");
        if (authorized.includes(Account.Trainee)) {
          if (traineeId) {
            if (verifiedUser.trainee.id === traineeId) {
              console.log("Trainee authorized to access own resources");
              return next();
            }
          } else {
            console.log("Trainee authorized for general access");
            return next();
          }
        }
      }
      console.log("Trainee access denied")
      if (verifiedUser.accountType === Account.Trainee) {
        throw new Error("Trainee not authorized to access resource");
      }

      //attempt to access as other account types
      if (!authorized.includes(verifiedUser.accountType)) {
        throw new Error("Unauthorized account type");
      }

      if (verifiedUser.accountType === Account.Admin) {
        console.log("Verifying admin access...");
        if (userId === verifiedUser.id && !generalAccess) {
          if (userId === verifiedUser.id) {
            throw new Error("Admin not authorized to change own account");
          }
        }
        console.log(`Admin authorized for general access`);
      }

      if (verifiedUser.accountType === Account.TraineeAdmin) {
        console.log("Verifying trainee admin access...");
        if (traineeId && !generalAccess) {
          const trainee = await prisma.trainee.findUnique({
            where: { id: traineeId },
            select: { category: true },
          });
          if (verifiedUser.authCategory !== trainee?.category) {
            throw new Error(
              "Trainee Admin not authorized to access trainees from other category"
            );
          }
          console.log(
            `Trainee Admin authorized to access trainee ${traineeId}`
          );
        } else if (userId && !generalAccess) {
          if (userId === verifiedUser.id) {
            throw new Error(
              "Trainee Admin not authorized to change own account"
            );
          }
          const trainee = await prisma.trainee.findUnique({
            where: { user: userId },
            select: { category: true },
          });

          if (verifiedUser.authCategory !== trainee?.category) {
            throw new Error(
              "Trainee Admin not authorized to access users from other category"
            );
          }
          console.log(`Trainee Admin authorized to access user ${userId}`);
        } else {
          console.log("Trainee Admin authorized for general access");
        }
      }

      if (verifiedUser.accountType === Account.Trainer) {
        console.log("Verifying trainer access...");
        console.log(trainingId, requirementId);
        if (trainingId && !generalAccess) {
          const trainingQuery = prisma.training.findUnique({
            where: { id: trainingId },
            select: { requirement: true },
          });
          const trainingsProvidedQuery = prisma.trainingProvided.findMany({
            where: { user: verifiedUser.id },
            select: { requirement: true },
          });
          const [training, trainingsProvided] = await Promise.all([
            trainingQuery,
            trainingsProvidedQuery,
          ]);
          if (!training?.requirement) {
            throw new Error("Training not found");
          }

          if (
            !trainingsProvided.find((t) => {
              return t.requirement === training.requirement;
            })
          ) {
            throw new Error("Not authorized to access training");
          }
          console.log(`Trainer authorized to access training ${trainingId}`);
        } else if (requirementId && !generalAccess) {
          const trainingsProvided = await prisma.trainingProvided.findMany({
            where: { user: verifiedUser.id },
            select: { requirement: true },
          });
          if (
            !trainingsProvided.find((t) => {
              return t.requirement === requirementId;
            })
          ) {
            throw new Error("Not authorized to access requirement");
          }
          console.log(
            `Trainer authorized to access requirement ${requirementId}`
          );
        } else {
          console.log("Trainer authorized for general access");
        }
      }
    } catch (err) {
      const error = err as Error;
      console.log(err);
      return res.status(404).json({ error: error.message });
    }
    return next();
  };

export { generateUrl, isAuth, login, findUser };
