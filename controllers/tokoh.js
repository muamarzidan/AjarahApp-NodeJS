const db = require('../models');
const Tokoh = db.tokohs;
const { Sequelize } = require('sequelize');

exports.create = async (req, res) => {
    if (!req.body.image || !req.body.nama) {
        res.status(400).send({
            status: 400,
            message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!",
            data: null
        });
        return;
    }
    const tokoh = {
        image: req.body.image,
        nama: req.body.nama
    };

    try {
        const newTokoh = await Tokoh.create(tokoh);
        res.status(201).send({ status: 201, message: "Suksess, Data tokoh berhasil ditambahkan", data: newTokoh });
    }catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getAll = async (req, res) => {
    const num = await Tokoh.findAll();

    if (num == 0) {
        res.status(404).send({ status: 404, message: `Data tidak ditemukan, sepertinya anda belum menambahkan data Tokoh`, data: null });
        return;
    }
    try {
        const seeTokoh = await Tokoh.findAll();
        res.status(200).send({ status: 200, message: "Suksess, Semua data Tokoh berhasil ditemukan", data: seeTokoh });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    const num = await Tokoh.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const seeTokoh = await Tokoh.findByPk(id, { rejectOnEmpty: true });
        res.status(200).send({ status: 200, message: `Suksess data dengan ${id} berhasil ditemukan`, data: seeTokoh });
    }   catch (error){
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const num = await Tokoh.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const updateTokoh = await Tokoh.update(req.body, { where: { id: id } });
        res.status(200).send({ status: 200, message: `Suksess data dengan id ${id} berhasil diupdate`, data: updateTokoh });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    const num = await Tokoh.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const deleteTokoh = await Tokoh.destroy({ where: { id: id } });
        res.status(200).send({ status: 200, message: `Suksess data dengan id ${id} berhasil dihapus`, data: deleteTokoh });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}


