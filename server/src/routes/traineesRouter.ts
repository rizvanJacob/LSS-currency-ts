import express from "express";
const router = express.Router();

import * as traineesController from "../controllers/traineesController";

router.get("/", traineesController.index);
router.get("/:id", traineesController.show);
router.get("/:id/bookings/:requirementId", traineesController.showBooking);
router.post("/", traineesController.create);
router.put("/checkin", traineesController.checkin);
router.put("/:id", traineesController.update);
router.put("/:id/book/:trainingId", traineesController.updateBooking);
router.delete("/:id", traineesController.delete);

export default router;
