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

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api/", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/trainees", traineesRouter);
app.use("/api/trainings", trainingsRouter);
app.use("/api/lookup", lookupRouter);

app.get("/api/auth");

const PORT = 3000;

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
