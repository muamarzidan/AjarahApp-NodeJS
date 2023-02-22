const db = require("../models");
const Peristiwa = db.peristiwas;
const { Sequelize } = require("sequelize");

// Create and Save a new Peristiwa
exports.create = (req, res) => {
    // Validate request
    if (!req.body.image || !req.body.kejadian || !req.body.deskripsi) {
        res.status(400).send({
        status: 400,
        message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!",
        data: null,
        });
        return;
    }
    const peristiwa = {
        image: req.body.image,
        kejadian: req.body.kejadian,
        deskripsi: req.body.deskripsi,
    };
    try {
        const newPeristiwa = Peristiwa.create(peristiwa);
        res.status(201).send({ status: 201, message: "Suksess, Data peristiwa berhasil ditambahkan", data: newPeristiwa});
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null,});
    }
};

exports.getAll = async (req, res) => {
    try {
        const seePeristiwa = await Peristiwa.findAll();
        res.status(200).send({ status: 200, message: "Suksess, Semua data Peristiwa berhasil ditemukan", data: seePeristiwa });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    const num = await Peristiwa.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const seePeristiwa = await Peristiwa.findByPk(id, { rejectOnEmpty: true });
        res.status(200).send({ status: 200, message: `Suksess data dengan ${id} berhasil ditemukan`, data: seePeristiwa });
    }   catch (error){
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const num = await Peristiwa.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const updatePeristiwa = await Peristiwa.update(req.body, { where: { id: id } });
        res.status(200).send({ status: 200, message: `Suksess data dengan id ${id} berhasil diupdate`, data: updatePeristiwa });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    const num = await Peristiwa.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const deletePeristiwa = await Peristiwa.destroy({ where: { id: id } });
        res.status(200).send({ status: 200, message: `Suksess data dengan id ${id} berhasil dihapus`, data: deletePeristiwa });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}
