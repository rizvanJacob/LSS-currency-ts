import express from "express";
const router = express.Router();
import trainingsController from "../controllers/trainingsController"


router.get("/", trainingsController.getAllTrainings);
router.get("/:trainingId", trainingsController.showTraining);

export default router;
