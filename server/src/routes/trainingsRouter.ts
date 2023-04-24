import express from "express";
const router = express.Router();
import trainingsController from "../controllers/trainingsController";
import { isAuth } from "../controllers/authController";

router.get("/", isAuth([1, 2, 4]), trainingsController.getAllTrainings);
router.get("/:id", isAuth([1, 2, 4]), trainingsController.showTraining);
router.put("/:id", isAuth([1, 2, 4]), trainingsController.updateTraining);
router.delete("/:id", isAuth([1, 2, 4]), trainingsController.deleteTraining);
router.post("/", isAuth([1, 2, 4]), trainingsController.createTraining);
export default router;
