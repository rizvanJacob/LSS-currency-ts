import client from "../config/sgid";
import { prisma } from "../config/database";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const JWT_SECRET = process.env.JWT_SECRET as string;

const generateUrl = (req: Request, res: Response) => {
  const url = client.authorizationUrl("state", "openid", null);

  res.status(200).json(url);
};

const login = async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    const { sub: openId } = await client.callback(code as string, null);
    console.log(openId);
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
        const token = await jwt.sign(userData, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });
      } else {
        res.status(400).json({
          message: "requested account has not been approved by an admin",
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
