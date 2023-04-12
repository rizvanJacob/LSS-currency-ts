import express from "express";
import { Request, Response } from "express";
import SgidClient from "@opengovsg/sgid-client";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = 3000;
const app = express();

const clientConfig = {
  clientId: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  privateKey: process.env.PRIVATE_KEY as string,
  redirectUri: "http://localhost:3000/",
};

const client = new SgidClient(clientConfig);

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
