import { renderBlog } from "../controllers/blogController.js";
import express from "express";

const router = express.Router();

router.get("/", renderBlog);

export default router;
