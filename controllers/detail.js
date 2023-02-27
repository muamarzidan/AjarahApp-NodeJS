const db = require('../models');
const Detail = db.details;
const { Sequelize } = require('sequelize');

exports.create = async (req, res) => {
    if (!req.body.image || !req.body.nama || !req.body.pasangan || !req.body.tempat_lahir || !req.body.tanggal_lahir || !req.body.wafat || !req.body.deskripsi) {
        res.status(400).send({
            status: 400,
            message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!",
            data: null
        });
        return;
    }
    const detail = {
        image: req.body.image,
        nama: req.body.nama,
        pasangan: req.body.pasangan,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        wafat: req.body.wafat,
        deskripsi: req.body.deskripsi
    };

    try {
        const newDetail = await Detail.create(detail);
        res.status(201).send({ status: 201, message: "Suksess, Data detail berhasil ditambahkan", data: newDetail });
    }catch (error) {
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
        const seeDetail = await Detail.findAll();
        res.status(200).send({ status: 200, message: "Suksess, Semua data Detail berhasil ditemukan", data: seeDetail });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    const num = await Detail.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const seeDetail = await Detail.findByPk(id, { rejectOnEmpty: true });
        res.status(200).send({ status: 200, message: `Suksess data dengan ${id} berhasil ditemukan`, data: seeDetail });
    }   catch (error){
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}


exports.update = async (req, res) => {
    const id = req.params.id;
    const num = await Detail.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const updateDetail = await Detail.update(req.body, { where: { id: id } });
        res.status(200).send({ status: 200, message: `Suksess, Data dengan id ${id} berhasil diupdate`, data: updateDetail });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    const num = await Detail.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const deleteDetail = await Detail.destroy({ where: { id: id } });
        res.status(200).send({ status: 200, message: `Suksess, Data dengan id ${id} berhasil dihapus`, data: deleteDetail });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}