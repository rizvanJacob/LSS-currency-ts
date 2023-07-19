import express from "express";
import logger from "morgan";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
import { connectDb } from "./config/database";
connectDb();

import authRouter from "./routes/authRouter";
import usersRouter from "./routes/usersRouter";
import traineesRouter from "./routes/traineesRouter";
import lookupRouter from "./routes/lookupRouter";
import trainingsRouter from "./routes/trainingsRouter";
import analyticsRouter from "./routes/analyticsRouter";
import cors from "cors";

export const UPDATED = "19 Jul 1431H";

const app = express();

app.use(logger("dev"));

// allow cors from the client url
const clientUrl = process.env.CLIENT_URL || null;
if (clientUrl) {
  const options: cors.CorsOptions = {
    methods: "GET,PUT,POST,DELETE",
    origin: clientUrl,
  };
  app.use(cors(options));
  app.options("*", cors(options));
} else {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
}
app.use(express.json());

app.use("/api", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/trainees", traineesRouter);
app.use("/api/trainings", trainingsRouter);
app.use("/api/lookup", lookupRouter);
app.use("/api/analytics", analyticsRouter);

app.get("/api/auth");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`start listening on port : ${PORT}`);
  console.log(path.join(__dirname, "../client/dist"));
});
