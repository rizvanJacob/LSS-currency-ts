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
  redirectUri: "http://localhost:3000",
};

const client = new SgidClient(clientConfig);

app.get("/", (req: Request, res: Response) => {
  res.send(JSON.stringify(client));
});

app.get("/api", (req: Request, res: Response) => {
  res.send("hello !!!!");
});

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
