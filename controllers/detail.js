const db = require('../models');
const Detail = db.details;
const { Sequelize } = require('sequelize');

exports.create = async (req, res) => {
    if (!req.body.nama || !req.body.pasangan || !req.body.tempat_lahir || !req.body.tanggal_lahir || !req.body.wafat || !req.body.deskripsi) {
        res.status(400).json({
            status: 400,
            message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!",
            data: null
        });
        return;
    }
    const Datadetail = {
        image: req.body.image,
        nama: req.body.nama,
        pasangan: req.body.pasangan,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        wafat: req.body.wafat,
        deskripsi: req.body.deskripsi
    };

    try {
        const CreateDetail = await Detail.create(Datadetail);
        res.json({ message: "Suksess, Data detail berhasil ditambahkan", data: CreateDetail });
    }catch (error) {
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getAll = async (req, res) => {
    const DataNull = await Detail.findAll();
    if (DataNull == 0) {
        res.json({ message: `Data Ditemukan, Tetapi datanya masih kosong`, data: DataNull });
        return;
    } else {
        try {
            const DataDetail = await Detail.findAll();
            res.json({ message: "Suksess, Semua data Detail berhasil ditemukan", data: DataDetail });
        } catch (error) {
            res.json({ status: 500, message: error.message || "Server Error", data: null });
        }
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    const num = await Detail.count({ where: { id: id } });
    if (isNaN(id)) {
        res.json({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    } else {
        try {
            const GetDetailId = await Detail.findByPk(id, { rejectOnEmpty: true });
            res.json({ message: `Suksess data dengan ${id} berhasil ditemukan`, data: GetDetailId });
        }   catch (error){
            res.json({ status: 500, message: error.message || "Server Error", data: null });
        }
    }
}


exports.update = async (req, res) => {
    const id = req.params.id;
    const num = await Detail.count({ where: { id: id } });
    if (isNaN(id)) {
        res.json(400).send({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.json(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    } 

    if (!req.body.image || !req.body.nama || !req.body.pasangan || !req.body.tempat_lahir || !req.body.tanggal_lahir || !req.body.wafat || !req.body.deskripsi) {
        res.json({
            status: 400,
            message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!",
            data: null
        });
        return;
    }
    const detailNew = {
        image: req.body.image,
        nama: req.body.nama,
        pasangan: req.body.pasangan,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        wafat: req.body.wafat,
        deskripsi: req.body.deskripsi
    };
    try {
        const updateDetail = await Detail.update(detailNew, { where: { id: id } });
        res.json({ message: `Suksess, Data dengan id ${id} berhasil diupdate`, data: updateDetail });
    } catch (error) {
        res.json(500).send({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    const num = await Detail.count({ where: { id: id } });
    if (isNaN(id)) {
        res.json({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const deleteDetail = await Detail.destroy({ where: { id: id } });
        res.json({ message: `Suksess, Data dengan id ${id} berhasil dihapus`, data: deleteDetail });
    } catch (error) {
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}