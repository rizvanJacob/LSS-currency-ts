import express from "express";
const router = express.Router();
import trainingsController from "../controllers/trainingsController";
import { isAuth } from "../controllers/authController";

router.get("/", isAuth([1, 2, 4]), trainingsController.getAllTrainings);
router.get("/:id", isAuth([1, 2, 4]), trainingsController.showTraining);
router.put("/:id", isAuth([4]), trainingsController.updateTraining);
router.put("/complete/:id", trainingsController.completeTraining);
router.delete("/:id", isAuth([4]), trainingsController.deleteTraining);
router.post("/", isAuth([4]), trainingsController.createTraining);
router.get(
  "/:userId/trainer",
  isAuth([1, 2, 4]),
  trainingsController.getAllTrainingsByTrainer
);
export default router;
