import AuthController from "../../../controller/globals/auth/authController";
import express, { Router } from "express";
const router: Router = express.Router();

router.route("/register").post(AuthController.registerUser);

export default router;
