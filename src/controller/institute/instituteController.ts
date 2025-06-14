import { Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInstituteNumber from "../../services/generateRandomInstituteNumber";

class InstituteController {
  static async createInstitute(req: Request, res: Response) {
    const {
      instituteName,
      instituteAddress,
      instituteEmail,
      institutePhoneNumber,
    } = req.body;
    const { instituteVatNo } = req.body || null;
    const { institutePanNo } = req.body || null; 
    if (
      !instituteName ||
      !institutePhoneNumber ||
      !instituteAddress ||
      !instituteEmail
    ) {
      res.status(400).json({
        message:
          "please provide instituteName, instituteEmail, institutePhoneNumber, instituteAddress",
      });
      return;
    }
    
    const instituteNumber = generateRandomInstituteNumber()

    await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      instituteName VARCHAR(255) NOT NULL UNIQUE,
      instituteEmail VARCHAR(255) NOT NULL UNIQUE,
      institutePhoneNumber VARCHAR(255) NOT NULL,
      instituteAddress VARCHAR(255) NOT NULL,
      instituteVatNo VARCHAR(255),
      institutePanNO VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`);

      await sequelize.query(`INSERT INTO institute_${instituteNumber} (instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo)VALUES (?,?,?,?,?,?)`,{
        replacements:[instituteName, instituteEmail, institutePhoneNumber, instituteAddress,institutePanNo, instituteVatNo]
      })
    res.status(201).json({
      message: "institute created",
    });
  }
}

export default InstituteController;
