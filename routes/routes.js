import { Router } from "express";
import authRouter from "./authRoutes.js"

const router = Router();

router.get("/", (req, res) => {
    res.json({msg: "Home"})
});
router.use("/auth", authRouter);

export default router;