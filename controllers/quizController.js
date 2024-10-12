import Quiz from "../models/quizModel.js";

export const createQuiz = async (req, res, next) => {
    const { title, description, questions } = req.body;
    const userId = req.user;
    try {
        const newQuiz =  new Quiz({
            title,
            description,
            questions,
            createdBy: userId
        });
        res.status(201).json({msg: "Created a new quiz successfully", Quiz: newQuiz});
    } catch (error) {
        next(error);
    }
}