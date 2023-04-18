import express from "express";
const router = express.Router();

import * as authController from "../controllers/authController";

router.get("/", authController.generateUrl);
router.get("/login/:code", authController.login);
router.get("/find/:openId", authController.findUser);

export default router;
