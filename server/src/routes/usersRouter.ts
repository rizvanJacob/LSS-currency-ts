import express from "express";
const router = express.Router();
import usersController from "../controllers/usersController"

router.get("/", usersController.getAllUsers);
export default router;
