import { Account } from "../constants";
import express from "express";
const router = express.Router();
import trainingsController from "../controllers/trainingsController";
import { isAuth } from "../controllers/authController";

router.get(
  "/",
  isAuth([
    Account.Admin,
    Account.TraineeAdmin,
    Account.Trainer,
    Account.Trainee,
  ]),
  trainingsController.getAllTrainings
);
router.get(
  "/:trainingId",
  isAuth([Account.Admin, Account.TraineeAdmin, Account.Trainer]),
  trainingsController.showTraining
);
router.put(
  "/:trainingId",
  isAuth([Account.Admin, Account.Trainer]),
  trainingsController.updateTraining
);
router.delete(
  "/:trainingId",
  isAuth([Account.Admin, Account.Trainer]),
  trainingsController.deleteTraining
);
router.post(
  "/",
  isAuth([Account.Admin, Account.Trainer]),
  trainingsController.createTraining
);
router.put(
  "/complete/:id",
  isAuth([Account.Admin, Account.Trainer]),
  trainingsController.completeTraining
);

export default router;
