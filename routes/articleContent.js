import express from "express";
import { renderArticleContent } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", renderArticleContent);

export default router;
