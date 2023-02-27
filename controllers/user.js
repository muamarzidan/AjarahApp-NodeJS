const db = require("../models");
const User = db.users;
const { Sequelize } = require("sequelize");

exports.create = async (req, res) => {
    if (!req.body.nama || !req.body.saran) {
        res.status(400).send({
            status: 400,
            message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!",
            data: null
        });
        return;
    }
    const usermasukan = {
        nama: req.body.nama,
        saran: req.body.saran
    };

    try {
        const newUsermasukan = await User.create(usermasukan);
        res.status(201).send({ status: 201, message: "Suksess, Data usermasukan berhasil ditambahkan", data: newUsermasukan });
    }   catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getAll = async (req, res) => {
    const id = req.params.id;
    const num = await Quiz.count({ where: { id: id } });

    if (num == 0) {
        res.status(404).send({ status: 404, message: `Data tidak ditemukan, sepertinya anda belum menambahkan data quiz`, data: null });
        return;
    }
    try {
        const seeUsermasukan = await User.findAll();
        res.status(200).send({ status: 200, message: "Suksess, Semua data Usermasukan berhasil ditemukan", data: seeUsermasukan });
    }   catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    const num = await User.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const seeUsermasukan = await User.findByPk(id, { rejectOnEmpty: true });
        res.status(200).send({ status: 200, message: `Suksess data dengan ${id} berhasil ditemukan`, data: seeUsermasukan });
    }   catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    const num = await User.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const deleteUsermasukan = await User.destroy({ where: { id: id } });
        res.status(200).send({ status: 200, message: `Suksess data dengan ${id} berhasil dihapus`, data: deleteUsermasukan });
    }   catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}
