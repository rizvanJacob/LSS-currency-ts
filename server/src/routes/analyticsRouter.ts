import express from "express";
const router = express.Router();

import analyticsController from "../controllers/analyticsController";

router.get("/requirement/:requirementId", analyticsController.currencyChart);

export default router;
