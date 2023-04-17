import SgidClient from "@opengovsg/sgid-client";
import { prisma } from "../config/database";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

const client = new SgidClient({
  clientId: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  privateKey: process.env.PRIVATE_KEY as string,
  redirectUri: "http://localhost:3000/api/login",
});

const generateUrl = (req: Request, res: Response) => {
  const url = client.authorizationUrl("state", "openid", null);

  res.status(200).json(url);
};

const login = async (req: Request, res: Response) => {
  const { code } = req.query;
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
        },
      });

      const token = await jwt.sign(userData, JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json(token);
    } catch (error) {
      //database not available
      console.log(error);
      res.status(500);
    }
  } catch (error) {
    //SG ID client unavailable
    console.log(error);
    res.redirect("/api");
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
