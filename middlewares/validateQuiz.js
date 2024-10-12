import { check, validationResult } from "express-validator";

export const validateQuiz = [
    check("title").notEmpty().withMessage("Title is required"),
    check("questions").isArray({ min: 1 }).withMessage("At least one question is required"),
    check("questions.*.text").notEmpty().withMessage("Question text is required"),
    check("questions.*.options")
        .isArray({ min: 4, max: 4 })
        .withMessage("Each question must have exactly four options"),
    check("questions.*.correctAnswer")
        .isInt({ min: 1, max: 3 })
        .withMessage("Correct answer is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
