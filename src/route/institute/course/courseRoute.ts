import express, { Request, Router } from "express";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import CourseController from "../../../controller/institute/course/courseController";
import upload from "../../../middleware/multerUpload";

const router: Router = express.Router();

router
  .route("/course")
  .post(
    Middleware.isLoggedIn,
    upload.single("courseThumbnail"),
   asyncErrorHandler(CourseController.createCourse)  
);

router.route("/course").get( Middleware.isLoggedIn, asyncErrorHandler(CourseController.getAllCourse));
router
  .route("/course/:id")
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(CourseController.deleteCourse)
  )
  .get(asyncErrorHandler(CourseController.getSingleCourse));

export default router;
