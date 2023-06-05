import express from "express";
import { Account } from "../constants";
import { isAuth } from "../controllers/authController";
const router = express.Router();

import analyticsController from "../controllers/analyticsController";

router.get(
  "/requirement/:requirementId",
  isAuth([Account.Admin]),
  analyticsController.currencyChart
);

export default router;
