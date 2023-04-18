import express from "express";
const router = express.Router();
import usersController from "../controllers/usersController"

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.put("/:id", usersController.updateUserById);
router.delete("/:id", usersController.deleteUserById);
export default router;
