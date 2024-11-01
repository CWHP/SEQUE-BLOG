import express from "express";
import { renderAddArticle, addArticle} from "../controllers/blogController.js";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get("/", renderAddArticle);
router.post("/", addArticle);

export default router;
