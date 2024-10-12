import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length === 4,
            message: 'There must be exactly four options.'
        }
    },
    correctAnswer: {
        type: Number,
        required: true
    }
});

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    questions: {
        type: [questionSchema]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

const quizModel = mongoose.model('Quiz', quizSchema);

export default quizModel;