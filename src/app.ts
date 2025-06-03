import express from "express";
const app = express();

import authRoute from "./route/globals/auth/authRoute";

app.use(express.json())

app.use("/", authRoute);
export default app;
