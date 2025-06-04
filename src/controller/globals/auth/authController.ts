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

  static loginUser = async (req: Request, res: Response) => {
    if (!req.body) {
      res.status(400).json({
        message: "No data was sent",
      });
      return;
    }
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "please provide above details",
      });
      return;
    }
    const [data] = await User.findAll({
      where: {
        email,
      },
    });
    if (!data) {
      res.status(400).json({
        message: "above email is not registered",
      });
      return;
    }
    const isMatched = bcrypt.compareSync(password, data.password);
    if (!isMatched) {
      res.status(400).json({
        message: "Invalid email or password",
      });
      return;
    }
    res.status(200).json({
      message: "login successfully",
    });
  };
}

export default AuthController;
