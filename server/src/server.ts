import express from "express";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

import client from "./config/sgid";
import { prisma, connectDb } from "./config/database";
connectDb();

const PORT = 3000;
const app = express();

const { url } = client.authorizationUrl(
  "state",
  ["openid", "myinfo.nric_number", "myinfo.date_of_birth"],
  null
);

app.get("/auth", (req: Request, res: Response) => {
  res.redirect(url);
});

app.get("/", async (req: Request, res: Response) => {
  const { code } = req.query;
  try {
    const { accessToken } = await client.callback(code as string);
    const { data } = await client.userinfo(accessToken as string);
    res.send(`data: ${JSON.stringify(data)}`);
  } catch (error) {
    res.redirect("/auth");
  }
});
app.get("/api", (req: Request, res: Response) => {
  res.send("hello !!!!");
});

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
