export const formatResults = (results) => {
    return results.map(result => ({
        _id: result._id,
        quiz: result.quiz._id,
        user: result.user,
        score: result.score,
        totalQuestions: result.totalQuestions,
        correctAnswers: result.correctAnswers,
        answers: result.answers.map(answer => ({
            selectedOption: answer.selectedOption,
            correctOption: answer.correctOption,
            question: result.quiz.questions.find(q => q._id.equals(answer.questionId))
        }))
    }));
}