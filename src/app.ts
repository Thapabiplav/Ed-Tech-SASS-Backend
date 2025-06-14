import express from "express";
const app = express();

import authRoute from "./route/globals/auth/authRoute";
import instituteRoute from "./route/institute/instituteRoute";

app.use(express.json());

app.use("/", authRoute);
app.use("/", instituteRoute);

export default app;
