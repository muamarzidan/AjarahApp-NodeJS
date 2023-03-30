const db = require('../models')
const Quiz = db.kuiz

exports.submitOne = async (req, res) => {

    const { quizId, answer } = req.body

    try {
        const quiz = await Quiz.findByPk(quizId)
        console.log(quiz)
        if (quiz && quiz.key === answer     ) {
            res.status(200).send({
                message: 'Jawabanmu benar, selamat!'
            })
        } else {
            res.status(200).send({
                message: 'Jawaban Salah'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: e.message || 'Some error occurred while retrieving quizzes.'
        })
    }
}

exports.submitMany = async (req, res) => {

    const { quizIds, answers } = req.body

    try {
        const quizzes = await Quiz.findAll({
            where: {
                id: quizIds
            }
        })

        let correct = 0
        let wrong = 0

        quizzes.forEach((quiz, index) => {
            if (quiz.key === answers[index]) {
                correct++
            } else {
                wrong++
            }
        })

        res.status(200).send({
            correct,
            wrong
        })
    } catch (e) {
        res.status(500).send({
            message: e.message || 'Some error occurred while retrieving quizzes.'
        })
    }
}