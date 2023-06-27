import {
  ALL,
  Account,
  TRAINEE_ACTIONS_ACCESS,
  TRAINEE_READ_ALL_ACCESS,
  TRAINEE_WRITE_ACCESS,
} from "../constants";
import express from "express";
const router = express.Router();
import { isAuth } from "../controllers/authController";
import * as traineesController from "../controllers/traineesController";

router.get("/", isAuth(TRAINEE_READ_ALL_ACCESS), traineesController.index);
router.get(
  "/:traineeId",
  isAuth(ALL, true),
  traineesController.show
);
router.post("/", traineesController.create);
router.put("/checkin", isAuth([Account.Trainee]), traineesController.checkin);
router.put(
  "/:traineeId",
  isAuth(TRAINEE_WRITE_ACCESS),
  traineesController.update
);
router.put(
  "/:traineeId/book/:trainingId",
  isAuth(TRAINEE_ACTIONS_ACCESS),
  traineesController.updateBooking
);
router.put(
  "/:traineeId/complete/:requirementId",
  isAuth(TRAINEE_ACTIONS_ACCESS),
  traineesController.completeRequirement
);
router.delete(
  "/:traineeId",
  isAuth(TRAINEE_WRITE_ACCESS),
  traineesController.delete
);
router.get(
  "/:traineeId/bookings/:requirementId",
  isAuth(ALL),
  traineesController.showBooking
);
router.get(
  "/bookings/csv",
  isAuth([Account.Admin]),
  traineesController.getAllBookings
);

export default router;
