import { NextFunction,  Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/userModel";
import { IExtendedRequest } from "../types/type";

class Middleware {
  static isLoggedIn(req: IExtendedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization ;
    if (!token) {
      res.status(401).json({
        message: "please provide token",
      });
      return;
    }

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      async (err, result: any) => {
        if (err) {
          res.status(403).json({
            message: "Token invalid",
          });
        } else {
          const userData = await User.findByPk(result.id);
          if (!userData) {
            res.status(403).json({
              message: "No user with that id found",
            });
          } else {
            req.user = userData;
            next();
          }
        }
      }
    );
  }
}

export default Middleware;
