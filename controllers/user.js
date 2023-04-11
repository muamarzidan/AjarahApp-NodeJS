const db = require("../models");
const User = db.users;

exports.create = async (req, res) => {
    if (!req.body.nama || !req.body.saran || !req.body.email || !req.body.type) {
        res.status(400).send({
            status: 400,
            message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!",
            data: null
        });
        return;
    }
    const usermasukan = {
        nama: req.body.nama,
        saran: req.body.saran,
        email: req.body.email,
        type: req.body.type
    };

    try {
        const newUsermasukan = await User.create(usermasukan);
        res.status(201).send({ status: 201, message: "Suksess, Data usermasukan berhasil ditambahkan", data: newUsermasukan });
    }   catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getAll = async (req, res) => {
    const num = await User.findAll();
    if (num == 0) {
        res.status(404).send({ status: 404, message: `Data tidak ditemukan, sepertinya belum ada user yang memeberikan saran ke aplikasi anada`, data: null });
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

exports.update = async (req, res) => {
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
        const updateUsermasukan = await User.update(req.body, { where: { id: id } });
        res.status(200).send({ status: 200, message: `Suksess data dengan ${id} berhasil diupdate`, data: updateUsermasukan });
    }   catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}
