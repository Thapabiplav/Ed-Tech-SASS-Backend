import AuthController from "../../../controller/globals/auth/authController";
import express, { Router } from "express";
const router: Router = express.Router();

router.route("/register").post(AuthController.registerUser);

router.route("/login").post(AuthController.loginUser);

export default router;
