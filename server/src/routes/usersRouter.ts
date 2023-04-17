import express from "express";
const router = express.Router();
import usersController from "../controllers/usersController"

router.get("/", usersController.getAllUsers);
router.get("/:openId", usersController.getUserById)

export default router;
