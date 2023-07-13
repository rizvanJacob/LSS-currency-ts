import { ALL, Account, TRAINING_WRITE_ACCESS } from "../constants";
import express from "express";
const router = express.Router();
import trainingsController from "../controllers/trainingsController";
import { isAuth } from "../controllers/authController";

router.get(
  "/",
  isAuth(ALL),
  trainingsController.getAllTrainings
);
router.get("/:trainingId/trainees", isAuth(ALL), trainingsController.traineesIndex)
router.get(
  "/:trainingId",
  isAuth(ALL),
  trainingsController.showTraining
);
router.put(
  "/:trainingId",
  isAuth(TRAINING_WRITE_ACCESS),
  trainingsController.updateTraining
);
router.delete(
  "/:trainingId",
  isAuth(TRAINING_WRITE_ACCESS),
  trainingsController.deleteTraining
);
router.post(
  "/",
  isAuth(TRAINING_WRITE_ACCESS),
  trainingsController.createTraining
);
router.put(
  "/complete/:trainingId",
  isAuth(TRAINING_WRITE_ACCESS),
  trainingsController.completeTraining
);

export default router;
