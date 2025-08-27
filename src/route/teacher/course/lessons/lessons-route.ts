import express, { Router } from "express";
import Middleware from "../../../../middleware/middleware";
import { UserRole } from "../../../../types/type";
import asyncErrorHandler from "../../../../services/asyncErrorHandler";
import { createChapterLesson, fetchChapterLesson } from "../../../../controller/teacher/courses/lessons/lesson-controller";



const router:Router = express.Router()

router.route("/:chapterId/lessons").post( Middleware.isLoggedIn, Middleware.restrictTo(UserRole.Teacher), asyncErrorHandler(createChapterLesson))
.get(Middleware.isLoggedIn,asyncErrorHandler(fetchChapterLesson))

export default router;