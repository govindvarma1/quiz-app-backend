import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({msg: "Home"})
});

export default router;