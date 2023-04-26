import {Account} from "../constants"
import express from "express";
const router = express.Router();
import usersController from "../controllers/usersController"
import { isAuth } from "../controllers/authController";

router.get("/", isAuth([Account.Admin]), usersController.getAllUsers);
router.post("/", usersController.createUser);
router.get("/:id", isAuth([Account.Admin]), usersController.getUserById);
router.put("/:id", isAuth([Account.Admin]), usersController.updateUserById);
router.delete("/:id", isAuth([Account.Admin]), usersController.deleteUserById);

export default router;
