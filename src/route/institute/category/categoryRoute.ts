import express, { Router } from "express";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import CategoryController from "../../../controller/institute/category/categoryController";

const router: Router = express.Router();

router
  .route("/category")
  .post(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.createCategory)
  )
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.getCategories)
  );

router
  .route("/category/:id")
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.deleteCategory)
  );

export default router;
