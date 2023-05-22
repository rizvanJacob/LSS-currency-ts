import express from "express";
const router = express.Router();

import analyticsController from "../controllers/analyticsController";

router.get(
  "/analytics/requirement/:requirementId/category/:categoryId",
  analyticsController.currencyChart
);

export default router;
