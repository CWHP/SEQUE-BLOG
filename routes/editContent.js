import express from "express";
import { editArticleContent, renderArticleContent } from "../controllers/blogController.js";

const router = express.Router();

router.get("/:id", renderArticleContent);
router.post("/:id", editArticleContent);

export default router;
