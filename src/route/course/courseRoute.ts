import express, { Router } from "express";
import Middleware from "../../middleware/middleware";
import asyncErrorHandler from "../../services/asyncErrorHandler";
import CourseController from "../../controller/course/courseController";


const router: Router = express.Router();

router
  .route("/course")
  .post(
    Middleware.isLoggedIn,
    asyncErrorHandler(CourseController.createCourse)
  );
  router.route('/course').get(asyncErrorHandler(CourseController.getAllCourse))
  router.route('/course/:id').delete(Middleware.isLoggedIn, asyncErrorHandler(CourseController.deleteCourse))

export default router;
