import express from "express";
const router = express.Router();
import { isAuth } from "../controllers/authController";
import * as traineesController from "../controllers/traineesController";

router.get("/", isAuth([1, 2, 3]), traineesController.index);
router.get("/:id", isAuth([1, 2, 3]), traineesController.show);
router.post("/", isAuth([1, 2, 3]), traineesController.create);
router.put("/:id", isAuth([1, 2, 3]), traineesController.update);
router.put("/:id/book/:trainingId", isAuth([1, 2, 3]), traineesController.updateBooking);
router.delete("/:id", isAuth([1, 2]), traineesController.delete);

export default router;
