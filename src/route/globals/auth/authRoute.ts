import AuthController from "../../../controller/globals/auth/authController";
import express, { Router } from "express";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
const router: Router = express.Router();

router.route("/register").post(asyncErrorHandler(AuthController.registerUser));

router.route("/login").post(asyncErrorHandler(AuthController.loginUser));

export default router;
