const db = require("../models");
const Quiz = db.quizs;

exports.submitOne = async (req, res) => {
    const jobsheet = {
        quizId: req.body.quizId,
        answer: req.body.answer,
    };
    try {
        var quiz = await Quiz.findOne({ 
            where: { 
                id: req.body.quizId 
            } 
        });
        if (req.body.answer === quiz.key) {
            res .status(200).send({
                "message": "Jawaban benar",
            })
        } else {
            res.status(200).json({
                "message": `Jawaban salah, jawaban yang benar adalah ${quiz.key}`,
            })
        }
    } catch (error) {
        res.status(500).json({
            "message": error.message || "Server Error",
        });
    };
};

exports.submitMany = async (req, res) => {
    const jobsheet = {
        quizId: req.body.quizId,
        answer: req.body.answer,
    };

    try {
        let benar = 0;
        let totalsoal = jobsheet.quizId.length;
        for (let i = 0; i < totalsoal; i++) {
            const quiz = await Quiz.findOne({ 
                limit: 1,
                where: { 
                    id: jobsheet.quizId[i] 
                },
                order: [ [ 'id', 'DESC' ]]
            });
            if (quiz.key == jobsheet.answer[i]) {
                benar = benar + 1;
                // benar = benar++;
            }
        }
        res.status(200).json({
            message: "Jawaban benar " + benar + " dari " + totalsoal + " soal",
        })
    }   catch (error) {
        res.status(500).json({
            message: error.message || "Server Error",
        });
    }
}
