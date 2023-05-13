import { Account } from "../constants";
import client from "../config/sgid";
import { prisma } from "../config/database";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

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
const JWT_EXPIRY = "1h";
const DEV_PORT = "5173";

const generateUrl = async (req: Request, res: Response) => {
  const clientUrl = formURL(req);
  console.log("clientUrl from generateURL", clientUrl);
  const login = client.authorizationUrl(
    "login",
    "openid",
    null,
    clientUrl.toString()
  ).url;

  const checkin = client.authorizationUrl(
    "checkin",
    "openid",
    null,
    clientUrl.toString()
  ).url;

  res.status(200).json({ login, checkin });
};

const login = async (req: Request, res: Response) => {
  const { code } = req.params;
  const clientUrl = formURL(req);

  try {
    const { sub: openId } = await client.callback(
      code as string,
      null,
      clientUrl.toString()
    );
    try {
      const userData = await prisma.user.findUniqueOrThrow({
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
        const token = await jwt.sign(userData, JWT_SECRET, {
          expiresIn: JWT_EXPIRY,
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

  const userData = await prisma.user.findUniqueOrThrow({
    where: { openId } as any,
    select: {
      id: true,
      displayName: true,
      authCategory: true,
      accountType: true,
    },
  });

  const token = await jwt.sign(userData, JWT_SECRET, { expiresIn: "1h" });
  res.json(token);
};

const isAuth =
  (authorized: number[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (!AUTHORISE) {
      return next();
    }

    try {
      const authorization = req.headers.authorization;
      const token = authorization?.split(" ")[1].toString();
      const traineeId = Number(req.params.traineeId);
      const userId = Number(req.params.userId);
      const trainingId = Number(req.params.trainingId);
      console.log("userId", userId);
      console.log("traineeId", traineeId);
      if (!token) {
        console.log("Missing token");
        return res
          .status(401)
          .json({ message: "Missing or invalid authorization token" });
      }

      const verifiedUser = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string
      ) as User;
      console.log("verified jwt token", verifiedUser);

      if (!authorized.includes(verifiedUser.accountType)) {
        throw new Error("Unauthorized account type");
      }
      if (verifiedUser.accountType === Account.TraineeAdmin) {
        console.log("Authorizing trainee admin...");
        if (traineeId) {
          const trainee = await prisma.trainee.findUnique({
            where: { id: traineeId },
            select: { category: true },
          });
          if (trainee && verifiedUser.authCategory === trainee?.category) {
            console.log("Trainee Admin authorized to access trainees");
            return next();
          } else {
            throw new Error(
              "Trainee Admin not authorized to access trainee from other category"
            );
          }
        } else if (trainingId) {
          const training = await prisma.training.findUnique({
            where: { id: trainingId },
            select: { requirement: true },
          });

          if (training) {
            console.log("Trainee Admin authorized access to trainings");
            return next();
          }
        } else if (userId) {
          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
              id: true,
            },
          });
          console.log("Selected user", user);
          const trainee = await prisma.trainee.findUnique({
            where: { user: user?.id },
            select: {
              category: true,
            },
          });
          if (trainee && verifiedUser.authCategory === trainee.category) {
            console.log("Trainee Admin authorised access to Trainee user");
            return next();
          }
        } else {
          console.log("Trainee Admin authorized with general access");
          return next();
        }
      } else if (verifiedUser.accountType === Account.Trainee) {
        console.log("Authorizing trainee...");
        if (traineeId) {
          const trainee = await prisma.trainee.findUnique({
            where: { id: traineeId },
            select: { user: true },
          });

          if (trainee?.user === verifiedUser.id) {
            console.log("Trainee authorized to access own resources");
            return next();
          } else {
            throw new Error(
              "Trainee unauthorized. Attempted to access other trainees"
            );
          }
        } else {
          const { trainee, checkin } = req.query;
          if (Number(trainee) === verifiedUser.trainee?.id || checkin) {
            console.log("Trainee authorized for query");
            return next();
          }
        }
      } else if (verifiedUser.accountType === Account.Trainer) {
        console.log("Authorizing trainer...");
        const trainingReq = req.body.requirement;
        const trainingsProvided = await prisma.trainingProvided.findMany({
          where: { user: verifiedUser.id },
          select: { requirement: true },
        });
        if (
          trainingReq &&
          !trainingsProvided.some(
            (training) => training.requirement === trainingReq
          )
        ) {
          throw new Error(
            "You are not authorized to create a training you did not specify before"
          );
        } else if (Number(trainingId)) {
          const training = await prisma.training.findUnique({
            where: { id: trainingId },
            select: { requirement: true },
          });

          const trainingsProvided = await prisma.trainingProvided.findMany({
            where: { requirement: training?.requirement },
            select: { user: true },
          });

          for (const training of trainingsProvided) {
            if (training.user === verifiedUser.id) {
              console.log(
                "Trainer authorized with access to trainings provided"
              );
              return next();
            }
          }
        } else {
          console.log("Trainer authorized for general access");
          return next();
        }
      } else if (verifiedUser.accountType === Account.Admin) {
        console.log("Admin authorized");
        return next();
      }
      throw new Error(
        "All authorization routes exhausted. Request is unauthorized"
      );
    } catch (err) {
      console.log("catch error", err);
      res.status(404).json({ err });
    }
  };

export { generateUrl, isAuth, login, findUser };

const formURL = (req: Request) => {
  const newURL = new URL("https://example.com");
  newURL.hostname = req.hostname;
  if (newURL.hostname === "localhost") {
    newURL.port = DEV_PORT;
    newURL.protocol = "http";
  } else {
    newURL.protocol = "https";
  }
  return newURL;
};
