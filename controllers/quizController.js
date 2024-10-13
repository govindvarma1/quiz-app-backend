import Quiz from "../models/quizModel.js";

export const createQuiz = async (req, res, next) => {
    const userId = req.user;
    const { title, description, questions } = req.body;
    try {
        const newQuiz =  new Quiz({
            title,
            description,
            questions,
            createdBy: userId
        });
        newQuiz.save();
        res.status(201).json({msg: "Created a new quiz successfully", Quiz: newQuiz});
    } catch (error) {
        next(error);
    }
}

export const getQuizzes = async (req, res, next) => {
    try {
        const quizzes = await Quiz.find().populate({
            path: 'createdBy',
            select: 'name email -_id'
        });
        res.status(201).json({msg: "success", quizzes: quizzes});
    } catch (error) {
        next(error);
    }
}

export const getQuizById = async (req, res, next) => {
    try {
        let quizId = req.params.id;
        const quiz = await Quiz.find({_id: quizId}).populate({
            path: 'createdBy',
            select: 'name email -_id'
        })
        res.status(201).json({msg: 'success', quiz: quiz});
    } catch (error) {
        next(error);
    }
}