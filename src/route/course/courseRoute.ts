import express, { Request, Router } from "express";
import Middleware from "../../middleware/middleware";
import asyncErrorHandler from "../../services/asyncErrorHandler";
import CourseController from "../../controller/course/courseController";
import multer from "multer";

// import { multer, storage } from "../../middleware/multerMiddleware";
// const upload = multer({ storage: storage });
import { storage } from "../../services/cloudinaryConfig";
const upload = multer({storage:storage,
  fileFilter:(req:Request,file:Express.Multer.File,cb)=>{
    const allowedFileTypes = ['image/png','image/jpeg','image/jpg']
    if(allowedFileTypes.includes(file.mimetype)){
      cb(null,true)
    }
    else{
      cb(new Error ('Only image are supported'))
    }
  }
})

const router: Router = express.Router();

router
  .route("/course")
  .post(
    Middleware.isLoggedIn,
    asyncErrorHandler(CourseController.createCourse)
  );
router.route("/course").get(asyncErrorHandler(CourseController.getAllCourse));
router
  .route("/course/:id")
  .delete(
    Middleware.isLoggedIn,upload.single('courseThumbnail'),
    asyncErrorHandler(CourseController.deleteCourse)
  )
  .get(asyncErrorHandler(CourseController.getSingleCourse));

export default router;
