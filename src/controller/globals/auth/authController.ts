import { Request, Response } from "express";
import User from "../../../database/models/userModel";

class AuthController {
  static registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({
        message: "please provide above details",
      });
      return;
    }
    await User.create({
      username,
      email,
      password,
    });
    res.status(200).json({
      message: "user registered successfully",
    });
  };
}

export default AuthController;
