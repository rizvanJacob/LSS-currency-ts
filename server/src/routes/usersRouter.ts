import { Account, TRAINEE_WRITE_ACCESS } from "../constants";
import express from "express";
const router = express.Router();
import usersController from "../controllers/usersController";
import { isAuth } from "../controllers/authController";

router.get("/", isAuth(TRAINEE_WRITE_ACCESS), usersController.getAllUsers);
router.post("/", usersController.createUser);
router.get("/:userId", isAuth(TRAINEE_WRITE_ACCESS), usersController.getUserById);
router.put("/:userId", isAuth(TRAINEE_WRITE_ACCESS), usersController.updateUserById);
router.delete("/:userId", isAuth(TRAINEE_WRITE_ACCESS), usersController.deleteUserById);

export default router;
