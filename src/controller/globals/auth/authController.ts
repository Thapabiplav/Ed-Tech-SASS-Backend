import { Request, Response } from "express";
import User from "../../../database/models/userModel";
import bcrypt from "bcrypt";

class AuthController {
  static registerUser = async (req: Request, res: Response) => {
    if (!req.body) {
      res.status(400).json({
        message: "No data was sent!!",
      });
      return;
    }
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
      password: bcrypt.hashSync(password, 12),
    });
    res.status(201).json({
      message: "user registered successfully",
    });
  };
}

export default AuthController;
