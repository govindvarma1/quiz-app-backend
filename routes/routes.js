import { Router } from "express";
import authRouter from "./authRoutes.js"
import quizRouter from "./quizRoutes.js"

const router = Router();

router.get("/", (req, res) => {
    res.json({msg: "Home"})
});

router.use("/auth", authRouter);
router.use("/quiz", quizRouter);

export default router;