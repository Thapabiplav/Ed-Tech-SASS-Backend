import express from "express";
const app = express();

import authRoute from "./route/globals/auth/authRoute";
import instituteRoute from "./route/institute/instituteRoute";
import courseRoute from "./route/institute/course/courseRoute";
import categoryRoute from './route/institute/category/categoryRoute'
import teacherInstituteRoute from './route/institute/teacher/teacherRoute'
import teacherRoute from './route/teacher/teacherRoute'
app.use(express.json());

app.use("/", authRoute);

app.use("/", instituteRoute);
app.use("/", courseRoute);
app.use('/',categoryRoute)
app.use('/',teacherInstituteRoute)

app.use("/",teacherRoute)

export default app;
