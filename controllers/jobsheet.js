const db = require("../models");
const Quiz = db.quizs;

exports.submitOne = async (req, res) => {
    const jobsheet = {
        quiz_id: req.body.quiz_id,
        answer: req.body.answer,
        score: req.body.score,
    }

    try {
        var quiz = await Quiz.findOne({ 
            where: { 
                id: req.body.quiz_id 
            } 
        });

        if (req.body.answer === quiz.key) {
            res .status(200).send({
                "message": "Jawaban benar",
            });
            jobsheet.score = 1;
        } else {
            res.status(200).send({
                "message": "Jawaban salah, jawaban yang benar adalah " + quiz.key + "",
                "message": `Jawaban salah, 3jawaban yang benar adalah ${quiz.key}`,
            })
            jobsheet.score = 0;
        }
    } catch (error) {
        res.status(500).send({
            "message": error.message || "Server Error",
        });
    };
};

exports.submitMany = async (req, res) => {
    const jobsheet = {
        quiz_id: req.body.quiz_id,
        answer: req.body.answer,
        score: req.body.score,
    };

    try {
        let benar = 0;
        let totalsoal = jobsheet.quiz_id.length;
        for (let i = 0; i < totalsoal; i++) {
            const quiz = await Quiz.findOne({ 
                limit: 1,
                where: { 
                    id: jobsheet.quiz_id[i] 
                },
                order: [ [ 'id', 'DESC' ]]
            });
            if (quiz.key == jobsheet.answer[i]) {
                benar = benar + 1;
                // benar = benar++;
            }
        }
        res.status(200).send({
            message: "Jawaban benar " + benar + " dari " + totalsoal + " soal",
        })
    }   catch (error) {
        res.status(500).send({
            message: error.message || "Server Error",
        });
    }
}
