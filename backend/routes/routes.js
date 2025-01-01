import express from "express";

import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.controller.js";
import { getCredentials } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/app", getCategories);
router.post("/login",getCredentials);
router.post("/app/create", createCategory);
router.patch("/app/:id", updateCategory);
router.delete("/app/:id", deleteCategory);

export default router;










