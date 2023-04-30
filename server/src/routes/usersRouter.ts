import { Account } from "../constants";
import express from "express";
const router = express.Router();
import usersController from "../controllers/usersController";
import { isAuth } from "../controllers/authController";

router.get("/", isAuth([Account.Admin, Account.TraineeAdmin]), usersController.getAllUsers);
router.post("/", usersController.createUser);
router.get("/:userId", isAuth([Account.Admin, Account.TraineeAdmin]), usersController.getUserById);
router.put("/:userId", isAuth([Account.Admin, Account.TraineeAdmin]), usersController.updateUserById);
router.delete("/:userId", isAuth([Account.Admin]), usersController.deleteUserById);

export default router;
