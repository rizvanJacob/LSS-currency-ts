import express from "express";
const router = express.Router();

import * as authController from "../controllers/authController";

router.get("/", authController.generateUrl);
router.get("/login", authController.login);

export default router;
