import express from "express";
const router = express.Router();
import trainingsController from "../controllers/trainingsController"


router.get("/", trainingsController.getAllTrainings);
router.get("/:id", trainingsController.showTraining);
router.put("/:id", trainingsController.updateTraining);
router.delete("/:id", trainingsController.deleteTraining);
export default router;
