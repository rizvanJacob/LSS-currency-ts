import { Account } from "../constants";
import express from "express";
const router = express.Router();
import { isAuth } from "../controllers/authController";
import * as traineesController from "../controllers/traineesController";

router.get(
  "/",
  isAuth([
    Account.Admin,
    Account.TraineeAdmin,
    Account.Trainee,
    Account.Trainer,
  ]),
  traineesController.index
);
router.get(
  "/:id",
  isAuth([
    Account.Admin,
    Account.TraineeAdmin,
    Account.Trainee,
    Account.Trainer,
  ]),
  traineesController.show
);
router.post("/", traineesController.create);
router.put("/checkin", isAuth([Account.Trainee]), traineesController.checkin);
router.put(
  "/:id",
  isAuth([Account.Admin, Account.TraineeAdmin, Account.Trainee]),
  traineesController.update
);
router.put(
  "/:id/book/:trainingId",
  isAuth([
    Account.Admin,
    Account.TraineeAdmin,
    Account.Trainee,
    Account.Trainer,
  ]),
  traineesController.updateBooking
);
router.put(
  "/:id/complete/:requirementId",
  isAuth([Account.Trainee, Account.TraineeAdmin]),
  traineesController.completeRequirement
);
router.delete(
  "/:id",
  isAuth([Account.Admin, Account.TraineeAdmin]),
  traineesController.delete
);
router.get(
  "/:id/bookings/:requirementId",
  isAuth([Account.Admin, Account.Trainee, Account.Trainer]),
  traineesController.showBooking
);

export default router;
