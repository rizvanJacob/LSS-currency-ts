import {Account} from "../constants"
import express from "express";
const router = express.Router();
import trainingsController from "../controllers/trainingsController";
import { isAuth } from "../controllers/authController";

router.get("/", isAuth([Account.Admin, Account.TraineeAdmin, Account.Trainer]), trainingsController.getAllTrainings);
router.get("/:id", isAuth([Account.Admin, Account.TraineeAdmin, Account.Trainer]), trainingsController.showTraining);
router.put("/:id", isAuth([Account.Trainer]), trainingsController.updateTraining);
router.delete("/:id", isAuth([Account.Trainer]), trainingsController.deleteTraining);
router.post("/", isAuth([Account.Trainer]), trainingsController.createTraining);
export default router;
