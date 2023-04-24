import express from "express";
const router = express.Router();
import usersController from "../controllers/usersController"
import { isAuth } from "../controllers/authController";

router.get("/", isAuth([1]), usersController.getAllUsers);
router.post("/",isAuth([1]), usersController.createUser);
router.get("/:id", isAuth([1]), usersController.getUserById);
router.put("/:id", isAuth([1]), usersController.updateUserById);
router.delete("/:id", isAuth([1]), usersController.deleteUserById);

export default router;
