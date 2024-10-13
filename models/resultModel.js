import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    correctAnswers: {
        type: Number,
        required: true
    },
    answers: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Quiz.questions",
                required: true
            },
            selectedOption: {
                type: Number,
                required: true
            },
            correctOption: {
                type: Number,
                required: true
            }
        }
    ]
})

const resultModel = mongoose.model('Result', resultSchema);

export default resultModel;