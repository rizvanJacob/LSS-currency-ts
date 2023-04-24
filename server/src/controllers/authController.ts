import client from "../config/sgid";
import { prisma } from "../config/database";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRY = "1h";
const PORT = "5173";

const generateUrl = async (req: Request, res: Response) => {
  const clientUrl = new URL("http://example.com");
  clientUrl.protocol = req.protocol;
  clientUrl.hostname = req.hostname;
  clientUrl.port = PORT;

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
  const clientUrl = new URL("http://example.com");
  clientUrl.protocol = req.protocol;
  clientUrl.hostname = req.hostname;
  clientUrl.port = PORT;

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

const isAuth = () => {};

const isUser = () => {};

export { generateUrl, isAuth, isUser, login, findUser };
