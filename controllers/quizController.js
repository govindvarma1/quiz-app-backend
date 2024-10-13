import { model } from "mongoose";
import Quiz from "../models/quizModel.js";
import Result from "../models/resultModel.js";
import { formatResults } from "../utils/formatResults.js";

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

export const takeQuiz = async (req, res) => {
    const { quizId } = req.params;
    const { answers } = req.body;
    const userId = req.user;    

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        let score = 0;
        let correctAnswersCount = 0;
        const totalQuestions = quiz.questions.length;
        const userAnswers = [];

        quiz.questions.forEach((question, index) => {
            const userAnswer = answers.find(ans => ans.questionId === question._id.toString());
            if (userAnswer) {
                const isCorrect = userAnswer.selectedOption === question.correctAnswer;
                if (isCorrect) {
                    score += 1;
                    correctAnswersCount += 1;
                }
                userAnswers.push({
                    questionId: question._id,
                    selectedOption: userAnswer.selectedOption,
                    correctOption: question.correctAnswer
                });
            }
        });

        const result = new Result({
            quiz: quizId,
            user: userId,
            score,
            totalQuestions,
            correctAnswers: correctAnswersCount,
            answers: userAnswers
        });

        await result.save();

        res.status(201).json({ message: "Quiz submitted successfully", result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUserResults = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const results = await Result.find({createdBy: userId}).populate({
            path: 'quiz',
            populate: {
                path: 'questions',
                model: 'Question'
            }
        }).exec();

        
        if (!results || results.length === 0) {
            return res.status(404).json({ msg: "No results found for this user." });
        }

        const formattedResults = formatResults(results);

        res.status(200).json({ msg: "success", results: formattedResults});
    } catch (error) {
        next(error);
    }
};

export const getAttemptResult = async (req, res, next) => {
    try {
        const { attemptId } = req.params;
        const attemptResult = await Result.findById(attemptId).populate({
            path: 'quiz',
            populate: {
                path: 'questions',
                model: 'Question'
            }
        }).exec();

        if (!attemptResult) {
            return res.status(404).json({ msg: "Quiz attempt not found." });
        }

        const formattedResult = formatResults([attemptResult]);

        res.status(200).json({ msg: "success", result: formattedResult[0] });
    } catch (error) {
        next(error);
    }
};

export const getResults = async (req, res, next) => {
    try {
        const results = await Result.find().populate({
            path: 'quiz',
            populate: {
                path: 'questions',
                model: 'Question'
            }  
        });

        if(!results || results.length === 0) {
            return res.status(404).json({ msg: "No results found" });
        }

        const formattedResults = formatResults(results);

        res.status(200).json({msg: "success", results: formattedResults})

    } catch(error) {
        next(error);
    }
}
