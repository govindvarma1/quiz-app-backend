import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateQuiz } from "../middlewares/validateQuiz.js";
import { createQuiz, getAttemptResult, getQuizById, getQuizzes, getUserResults, takeQuiz } from "../controllers/quizController.js";

const router = Router();

router.post("/createQuiz", verifyToken, validateQuiz, createQuiz);
router.get('/getQuizzes', getQuizzes);
router.get('/getQuiz/:id', getQuizById);
router.post('/takeQuiz/:quizId', verifyToken, takeQuiz);
router.get('/results/user', verifyToken, getUserResults);
router.get('/results/attempt/:attemptId', getAttemptResult);

export default router;