import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateQuiz } from "../middlewares/validateQuiz.js";
import { createQuiz, getQuizzes } from "../controllers/quizController.js";

const router = Router();

router.post("/createQuiz", verifyToken, validateQuiz, createQuiz);
router.get('/getQuizzes', getQuizzes);

export default router;