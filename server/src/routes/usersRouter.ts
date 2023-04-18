import express from "express";
const router = express.Router();
import usersController from "../controllers/usersController"

router.get("/", usersController.getAllUsers);
router.get("/:openId", usersController.getUserById);
router.put("/:openId", usersController.updateUserById);
router.delete("/:openId", usersController.deleteUserById);
export default router;
