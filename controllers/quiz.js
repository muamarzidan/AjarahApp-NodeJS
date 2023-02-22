const db = require('../models');
const Quiz = db.quizs;
const { Sequelize } = require('sequelize');

exports.create = async (req, res) => {
    // better to validate the request body first
    if (!req.body.quiz || !req.body.a || !req.body.b || !req.body.c || !req.body.d || !req.body.key) {
        res.status(400).send({
            status: 400,
            message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!",
            data: null
        });
        return;
    }
    const quiz = {
        quiz: req.body.quiz,
        a: req.body.a,
        b: req.body.b,
        c: req.body.c,
        d: req.body.d,
        key: req.body.key
    };

    try {
        const newQuiz = await Quiz.create(quiz);
        res.status(201).send({ status: 201, message: "Suksess, Data quiz berhasil ditambahkan", data: newQuiz });
    }catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getAll = async (req, res) => {
    try {
        const seeQuiz = await Quiz.findAll();
        res.status(200).send({ status: 200, message: "Suksess, Semua data Quiz berhasil ditemukan", data: seeQuiz });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    const num = await Quiz.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const seeQuiz = await Quiz.findByPk(id, { rejectOnEmpty: true });
        res.status(200).send({ status: 200, message: `Suksess data dengan ${id} berhasil ditemukan`, data: seeQuiz });
    }   catch (error){
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const num = await Quiz.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const updateQuiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        updateQuiz.update(req.body, {
            where: {id}
        });
        res.status(200).send({ status: 200, message: `Sukess, data dengan ${id} berhasil diupdate`, data: updateQuiz });
    }   catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    const num = await Quiz.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const deleteQuiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        deleteQuiz.destroy();
        res.status(200).send({ status: 200, message: `Sukess, data dengan ${id} berhasil dihapus`, data: deleteQuiz });
    }   catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}
    
        