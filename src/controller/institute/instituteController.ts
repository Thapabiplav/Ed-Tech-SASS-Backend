import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInstituteNumber from "../../services/generateRandomInstituteNumber";
import { IExtendedRequest } from "../../types/type";
import User from "../../database/models/userModel";
import categories from "../../seed";

class InstituteController {
  static async createInstitute(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const {
      instituteName,
      instituteAddress,
      instituteEmail,
      institutePhoneNumber,
    } = req.body;

    const instituteVatNo = req.body.instituteVatNo || null;
    const institutePanNo = req.body.institutePanNo || null;

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

    const instituteNumber = generateRandomInstituteNumber();

    // if(req.user) {
    //   const user = await User.findByPk(req.user.id)
    //   user?currentInstituteNumber = instituteNumber
    //   await user?.save()
    // }

    await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      instituteName VARCHAR(255) NOT NULL UNIQUE,
      instituteEmail VARCHAR(255) NOT NULL UNIQUE,
      institutePhoneNumber VARCHAR(255) NOT NULL,
      instituteAddress VARCHAR(255) NOT NULL,
      instituteVatNo VARCHAR(255),
      institutePanNo VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`);

    await sequelize.query(
      `INSERT INTO institute_${instituteNumber} (instituteName, instituteEmail, institutePhoneNumber, instituteAddress, instituteVatNo, institutePanNo) VALUES (?,?,?,?,?,?)`,
      {
        replacements: [
          instituteName,
          instituteEmail,
          institutePhoneNumber,
          instituteAddress,
          instituteVatNo,
          institutePanNo,
        ],
      }
    );

    await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      userId VARCHAR(255) REFERENCES users(id),
       instituteNumber INT UNIQUE
        )`);

    if (req.user) {
      await sequelize.query(
        `INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`,
        {
          replacements: [req.user?.id, instituteNumber],
        }
      );
      await User.update(
        {
          currentInstituteNumber: instituteNumber,
          role: "institute",
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
       req.user.currentInstituteNumber= instituteNumber
    }
    next();
  }

 static  async createTeacherTable (req:IExtendedRequest, res:Response,next:NextFunction){
  const instituteNumber = req.user?.currentInstituteNumber
  await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber} (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    teacherName VARCHAR(255) NOT NULL,
    teacherEmail VARCHAR(255) NOT NULL UNIQUE,
    teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
    teacherExpertise VARCHAR(255),
    teacherJoinedDate DATE,
    teacherSalary VARCHAR(255),
    teacherPhoto VARCHAR(255),
    teacherPassword VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`)
    next()
 }

 static async createStudentTable (req:IExtendedRequest, res:Response , next:NextFunction){
  const instituteNumber = req.user?.currentInstituteNumber
  await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
   id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    studentName VARCHAR(255) NOT NULL,
    studentEmail VARCHAR(255) NOT NULL UNIQUE,
    studentPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
    studentAddress TEXT,
    enrollDate DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`)
    next()
 }

 static async createCourseTable (req:IExtendedRequest, res:Response ){
  const instituteNumber = req.user?.currentInstituteNumber
  await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
   id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    courseName VARCHAR(255) NOT NULL UNIQUE,
    coursePrice VARCHAR(255) NOT NULL,
    courseDuration VARCHAR(255)  NOT NULL,
    courseDescription TEXT,
    courseThumbnail VARCHAR(255),
    teacherId VARCHAR(36)  NULL REFERENCES teacher_${instituteNumber}(id),
    categoryId VARCHAR(36) NOT NULL REFERENCES category_${instituteNumber} (id),
    courseLevel ENUM('beginner','intermediate','advance') ,
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`)
   res.status(201).json({
        message: "Institute created successfully",
        instituteNumber,
      });
      return;
 }
 
static async createCategoryTable (req:IExtendedRequest,res:Response,next:NextFunction){
  const instituteNumber = req.user?.currentInstituteNumber
  await sequelize.query(`CREATE TABLE IF NOT EXISTS category_${instituteNumber}(
   id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    categoryName VARCHAR(100) NOT NULL,
    categoryDescription TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`)
    
    categories.forEach(async function(category){
      await sequelize.query(`INSERT INTO category_${instituteNumber}(categoryName,categoryDescription) VALUES (?,?)`,{
        replacements:[category.categoryName,category.categoryDescription]
      })
    })
    next()
}

}



export default InstituteController;
