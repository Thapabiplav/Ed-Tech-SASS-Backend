import express from "express";
const app = express();

import authRoute from "./route/globals/auth/authRoute";
import instituteRoute from "./route/institute/instituteRoute";
import courseRoute from "./route/course/courseRoute";

app.use(express.json());

app.use("/", authRoute);
app.use("/", instituteRoute);
app.use("/", courseRoute);

export default app;
