import { Request, Response } from "express";
import { IExtendedRequest } from "../../../types/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";


class CourseController {
  static async createCourse(req:IExtendedRequest,res:Response){
    const instituteNumber = req.user?.currentInstituteNumber
    const { coursePrice , courseName,courseDescription,courseDuration,courseLevel,categoryId} = req.body
    if(!coursePrice || !courseName || !courseDescription || !courseDuration || !courseLevel || !categoryId){
      res.status(400).json({
        message:"please provide coursePrice, courseName,courseDescription, courseLevel,categoryId"
      })
      return
    }

    const courseThumbnail = req.file ?req.file.path : null

    await sequelize.query(`INSERT INTO course_${instituteNumber}(
      coursePrice,courseName,courseDescription,courseDuration,courseLevel,courseThumbnail,categoryId) VALUES (?,?,?,?,?,?,?)`,{
        replacements:[,courseDescription,courseDuration,courseLevel,courseThumbnail,categoryId],
        type:QueryTypes.INSERT
      })
      res.status(200).json({
        message:'course created successfully'
      })
      return
  }

  static async deleteCourse (req:IExtendedRequest,res:Response){
    const instituteNumber = req.user?.currentInstituteNumber
    const courseId = req.params.id
    const [courseData] = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=?`,{
      replacements:[courseId]
    })

    if(courseData.length === 0){
      res.status(404).json({
        message:'no course with that id'
      })
      return
    }

    sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ${courseId}`,{
     type:QueryTypes.DELETE 
    })
    res.status(200).json({
      message:'course deleted successfully'
    })
    return
  }

  static async getAllCourse (req:IExtendedRequest,res:Response){
    const instituteNumber = req.user?.currentInstituteNumber
   const courses= await sequelize.query(`SELECT * FROM course_${instituteNumber}JOIN category_${instituteNumber} ON course_${instituteNumber}.categoryId = category${instituteNumber}.id`,{
    type:QueryTypes.SELECT
   })
    res.status(200).json({
      message:'course fetched successfully',
      data:courses
    })
    return
  }

  static async getSingleCourse(req:IExtendedRequest,res:Response){
    const instituteNumber = req.user?.currentInstituteNumber
    const courseId = req.params.id
    const course = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=?`,{
      replacements:[courseId],
      type:QueryTypes.SELECT
    })
    res.status(200).json({
      message:"single course fetched",
      data:course
    })
  }
}

export default CourseController