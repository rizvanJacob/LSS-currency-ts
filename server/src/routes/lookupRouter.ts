import express from "express";
const router = express.Router();

import * as lookupController from "../controllers/lookupController";

router.get("/categories", lookupController.categories);
router.get("/statuses", lookupController.statuses);
router.get("/requirements", lookupController.requirements);
router.get("/accountTypes", lookupController.accountTypes);
router.get("/trainingsProvided", lookupController.trainingsProvided);
export default router;
