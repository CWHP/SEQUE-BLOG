import express from "express";
import { deleteArticle } from "../controllers/blogController.js";

const router = express.Router();

router.get("/:id", deleteArticle);

export default router;
