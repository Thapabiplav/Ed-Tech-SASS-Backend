import express from "express";
const app = express();

import cors from "cors";
import authRoute from "./route/globals/auth/authRoute";
import instituteRoute from "./route/institute/instituteRoute";
import courseRoute from "./route/institute/course/courseRoute";
import categoryRoute from "./route/institute/category/categoryRoute";
import teacherInstituteRoute from "./route/institute/teacher/teacherRoute";
import teacherRoute from "./route/teacher/teacherRoute";
import lessonRoute from './route/teacher/course/lessons/lessons-route'
import chapterRoute from './route/teacher/course/chapters/course-chapter-route'
app.use(express.json());

app.use(
  cors({
    origin:[ "http://localhost:3000", "http://localhost:3001"]
  })
);

app.use("/", authRoute);

app.use("/", instituteRoute);
app.use("/", courseRoute);
app.use("/", categoryRoute);
app.use("/", teacherInstituteRoute);

app.use("/teacher", teacherRoute);
app.use('/teacher/course', chapterRoute)
app.use('/teacher/course', lessonRoute)

export default app;
