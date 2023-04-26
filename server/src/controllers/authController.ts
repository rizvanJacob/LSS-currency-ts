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
};

const AUTHORISE = false;

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRY = "1h";
const DEV_PORT = "5173";

const generateUrl = async (req: Request, res: Response) => {
  const clientUrl = formURL(req);
  const loginCallback = `${clientUrl}loginCallback`;
  const checkinCallback = `${clientUrl}checkinCallback`;

  const login = client.authorizationUrl(
    "state",
    "openid",
    null,
    loginCallback
  ).url;

  const checkin = client.authorizationUrl(
    "state",
    "openid",
    null,
    checkinCallback
  ).url;

  res.status(200).json({ login, checkin });
};

const login = async (req: Request, res: Response) => {
  const { code } = req.params;
  const { callback } = req.query;
  const clientUrl = formURL(req);

  const fullCallback = `${clientUrl}${callback}`;

  try {
    const { sub: openId } = await client.callback(
      code as string,
      null,
      fullCallback
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
  (req: Request, res: Response, next: NextFunction) => {
    if (!AUTHORISE) return next();

    try {
      const authorization = req.headers.authorization;
      const token = authorization?.split(" ")[1];

      if (!token) {
        res
          .status(401)
          .json({ message: "Missing or invalid authorization token" });
        return;
      }

      const verifiedUser = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string
      ) as User;
      console.log(verifiedUser);

      if (authorized.includes(verifiedUser.accountType)) {
        console.log("Authenticated!");
        next();
      } else {
        console.log("Unauthorized access attempt");
        res
          .status(401)
          .json({ message: "You are not authorized to access this resource." });
      }
    } catch (err) {
      res.status(404).json({ message: "NOT FOUND" });
    }
  };

export { generateUrl, isAuth, login, findUser };

const formURL = (req: Request) => {
  const newURL = new URL("https://example.com");
  console.log("protocol: ", req.protocol);
  newURL.protocol = req.protocol;

  console.log("hostname: ", req.hostname);
  newURL.hostname = req.hostname;
  if (newURL.hostname === "localhost") {
    newURL.port = DEV_PORT;
  }
  return newURL;
};
