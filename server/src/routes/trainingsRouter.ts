import {Account} from "../constants"
import express from "express";
const router = express.Router();
import trainingsController from "../controllers/trainingsController";
import { isAuth } from "../controllers/authController";

router.get("/", isAuth([Account.Admin, Account.TraineeAdmin, Account.Trainer]), trainingsController.getAllTrainings);
router.get("/:id", isAuth([Account.Admin, Account.TraineeAdmin, Account.Trainer]), trainingsController.showTraining);
router.put("/:id", isAuth([Account.Admin, Account.Trainer]), trainingsController.updateTraining);
router.delete("/:id", isAuth([Account.Admin, Account.Trainer]), trainingsController.deleteTraining);
router.post("/", isAuth([Account.Admin, Account.Trainer]), trainingsController.createTraining);
router.put("/complete/:id", trainingsController.completeTraining);

export default router;
