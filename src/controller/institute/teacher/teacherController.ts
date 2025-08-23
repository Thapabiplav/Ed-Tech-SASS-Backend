import { Response } from "express";
import { IExtendedRequest } from "../../../types/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPassword from "../../../services/generateRandomPassword";
import sendMail from "../../../services/sendMail";

class TeacherController {
  static async createTeacher(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const {
      teacherName,
      teacherEmail,
      teacherPhoneNumber,
      teacherExpertise,
      teacherSalary,
      teacherJoinedDate,
      courseId,
    } = req.body;
    const teacherPhoto = req.file ? req.file.path : null;
    if (
      !teacherName ||
      !teacherEmail ||
      !teacherPhoneNumber ||
      !teacherExpertise ||
      !teacherSalary ||
      !teacherJoinedDate
    ) {
      res.status(400).json({
        message:
          "please provide teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise,teacherSalary,teacherJoinedDate",
      });
      return;
    }
    const data = generateRandomPassword(teacherName);

    await sequelize.query(
      `INSERT INTO teacher_${instituteNumber} (teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,teacherJoinedDate,teacherSalary,teacherPhoto,teacherPassword) VALUES (?,?,?,?,?,?,?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [
          teacherName,
          teacherEmail,
          teacherPhoneNumber,
          teacherExpertise,
          teacherJoinedDate,
          teacherSalary,
          teacherPhoto,
          data.hashedVersion,
        ],
      }
    );

    const teacherData: { id: string }[] = await sequelize.query(
      `SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail=?`,
      {
        type: QueryTypes.SELECT,
        replacements: [teacherEmail],
      }
    );

    await sequelize.query(
      `UPDATE course_${instituteNumber} SET teacherId=? WHERE id=?`,
      {
        type: QueryTypes.UPDATE,
        replacements: [teacherData[0].id, courseId],
      }
    );

    const mailInformation = {
      to: teacherEmail,
      subject: "Welcome to our platform as a teacher of ShikshaSaSS",
      text: `Welcome to our platform, Email:${teacherEmail}, Password:${data.plainVersion},
      Your Institute Number : ${instituteNumber}`,
    };
    await sendMail(mailInformation);

    res.status(201).json({
      message: "teacher created successfully",
    });
    return;
  }

  static async getTeachers(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber; 
    const teachers = await sequelize.query(`SELECT * FROM teacher_${instituteNumber}`,{
        type : QueryTypes.SELECT
    })
    res.status(200).json({
        message : "teachers fetched", data:teachers
    })
}

  static async deleteTeacher(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const id = req.params.id;
    await sequelize.query(`DELETE FROM teacher_${instituteNumber} WHERE id=?`, {
      type: QueryTypes.DELETE,
      replacements: [id],
    });
    res.status(200).json({
      message: "teacher deleted successfully",
    });
  }
}

export default TeacherController;
