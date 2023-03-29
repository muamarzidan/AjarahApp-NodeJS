const db = require('../models');
const Tokoh = db.tokohs;

exports.create = async (req, res) => {
    if (!req.file || !req.body.nama) {
        res.status(400).json({ status: 400, message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!", data: null});
        return;
    }
    const NewTokoh = {
        image: req.file.path,
        nama: req.body.nama
    };
    try {
        const CreateTokoh = await Tokoh.create(NewTokoh);
        res.status(201).json({ status: 201, message: "Permintaan anda sukses diproses, data tokoh berhasil ditambahkan", data: CreateTokoh });
    }catch (error) {
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getAll = async (req, res) => {
    try {
    const tokos = await Tokoh.findAll();
        if (tokos.length == 0) {
            res.status(404).json({ status: 404, message: `Data tidak ditemukan, sepertinya anda belum menambahkan data Tokoh`, data: null });
            return;
        }
        res.json({ status: 200, message: "Permintaan anda sukses diproses, Semua data Tokoh berhasil ditemukan", data: tokos });
    } catch (error) {
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    const num = await Tokoh.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).json({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const seeTokoh = await Tokoh.findByPk(id, { rejectOnEmpty: true });
        res.json({ status: 200, message: `Permintaan anda sukses diproses, data dengan ${id} berhasil ditemukan`, data: seeTokoh });
    }catch (error){
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const num = await Tokoh.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).json({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    const { nama } = req.body;
    const image = req.file ? req.file.path : null;
    if (!nama && !image) {
        res.status(400).json({ status: 400, message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!", data: null });
        return;
    }
    try {
        const updateTokoh = await Tokoh.update({ nama, image }, { where: { id: id } });
        res.json({ status: 200, message: `Permintaan anda sukses diproses, data dengan id ${id} berhasil diupdate`, data: updateTokoh });
    } catch (error) {
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    const num = await Tokoh.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).json({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const deleteTokoh = await Tokoh.destroy({ where: { id: id } });
        res.json({ status: 200, message: `Permintaan anda sukses diproses, data dengan id ${id} berhasil dihapus`, data: deleteTokoh });
    } catch (error) {
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}


