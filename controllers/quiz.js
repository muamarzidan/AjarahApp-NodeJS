const db = require('../models');
const Quiz = db.quizs;
const { Sequelize } = require('sequelize');

exports.create = async (req, res) => {
    // better to validate the request body first
    if (!req.body.quiz) {
        res.status(400).send({
            message: "Field tidak boleh kosong!"
        });
        return;
    }

    const quiz = {
        quiz: req.body.quiz,
        a: req.body.a,
        b: req.body.b,
        c: req.body.c,
        d: req.body.d,
        key: req.body.key,
        category_id: req.body.category_id,
        level_id: req.body.level_id
    };

    try {
        const newQuiz = await Quiz.create(quiz);
        res.json({
            status: 200,
            message: 'Asik, data berhasil ditambahkan',
            data: newQuiz
        });
    }   catch (error) {
        res.json({
            status: 500,
            message: error.message || 'Server Error',
            data: null
        });
    }
}

exports.getAll = async (req, res) => {
    try {
        const seeQuiz = await Quiz.findAll();
        res.json({
            status: 200,
            message: 'Success',
            data: seeQuiz
        });
    } catch (error) {
        res.json({
            status: 500,
            message: error.message || 'Server Error',
            data: null
        });
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const seeQuiz = await Quiz.findByPk(id, { rejectOnEmpty: true });
        res.json({
            status: 200,
            message: 'Success',
            data: seeQuiz
        });
    }   catch (error){
        res.json({
            status: 500,
            message: error.message || 'Server Error',
            data: null
        });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        const updateQuiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        updateQuiz.update(req.body, {
            where: {id}
        });
        res.json({
            status: 200,
            message: 'Success',
            data: updateQuiz
        })
    }   catch (error) {
        res.json({
            status: 500,
            message: error.message || 'Server Error',
            data: null
        });
    }
    // Quiz.update(req.body, {
    //     where: { id: id }
    // })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 message: "Quiz was updated successfully."
    //             });
    //         } else {
    //             res.send({
    //                 message: `Cannot update Quiz with id=${id}. Maybe Quiz was not found or req.body is empty!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error updating Quiz with id=" + id
    //         });
    //     }
    //     );
}

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteQuiz = await Quiz.findByPk(id, { rejectOnEmpty: true })

        deleteQuiz.destroy();

        res.json({
            status: 200,
            message: 'Success',
        })
    }   catch (error) {
        res.json({
            status: 500,
            message: error.message || 'Server Error',
            data: null
        });
    }
    // Quiz.destroy({
    //     where: { id: id }
    // })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 message: "Quiz was deleted successfully!"
    //             });
    //         } else {
    //             res.send({
    //                 message: `Cannot delete Quiz with id=${id}. Maybe Quiz was not found!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Could not delete Quiz with id=" + id
    //         });
    //     });
}
    
        