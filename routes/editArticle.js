import express from "express";
import { editArticle, renderEditArticle } from "../controllers/blogController.js";
import bodyParser from "body-parser";

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.get("/:id", renderEditArticle);
router.post("/:id", editArticle);

export default router;
