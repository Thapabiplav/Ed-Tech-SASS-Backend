import express, { Router } from "express";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import TeacherController from "../../../controller/institute/teacher/teacherController";
import upload from "../../../middleware/multerUpload";

const router: Router = express.Router();

router
  .route("/teacher")
  .post(
    Middleware.isLoggedIn,
    upload.single("teacherPhoto"),
    asyncErrorHandler(TeacherController.createTeacher)
  )
  .get(Middleware.isLoggedIn, asyncErrorHandler(TeacherController.getTeachers));

router
  .route("/teacher/:id")
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(TeacherController.deleteTeacher)
  );

export default router;
