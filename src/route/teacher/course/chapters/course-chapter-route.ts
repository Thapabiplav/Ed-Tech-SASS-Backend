import express,{Router} from 'express'
import asyncErrorHandler from '../../../../services/asyncErrorHandler';
import { addChapterToCourse, fetchCourseChapters } from '../../../../controller/teacher/courses/chapters/chapter-controller';
import Middleware from '../../../../middleware/middleware';
import { UserRole } from '../../../../types/type';



const router:Router = express.Router()

router.route("/course/:courseId/chapters/").
post(Middleware.isLoggedIn,Middleware.restrictTo(UserRole.Teacher),asyncErrorHandler(addChapterToCourse)).get(Middleware.isLoggedIn,asyncErrorHandler(fetchCourseChapters))

export default router; 