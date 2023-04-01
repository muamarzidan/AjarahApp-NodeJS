const db = require("../models");
const Timeline = db.timelines;

exports.create = async (req, res) => {
    if (!req.body.tahun || !req.body.detail_tahun) {
        res.status(400).json({ status: 400, message: "Permintaan anda tidak dapat diproses, Data tidak lengkap", data: null });
        return;
    }
    try {
        const newTimeline = {
            tahun: req.body.tahun,
            detail_tahun: req.body.detail_tahun,
        };
        const CreateTimeline = await Timeline.create(newTimeline);
        res.status(201).json({ status: 201, message: "Permintaan anda sukses diproses, Data berhasil dibuat", data: CreateTimeline });
    }catch (error) {
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    const num = await Timeline.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).json({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    }else if (num == 0) {
        res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const GetOneTimeline = await Timeline.findByPk(id, { rejectOnEmpty: true });
        res.json({ status: 200, message: "Permintaan anda sukses diproses, Data berhasil didapatkan", data: GetOneTimeline });
    }catch (error) {
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getAll = async (req, res) => {
    try {
        const timelines = await Timeline.findAll();
        if (timelines.length == 0) {
            res.status(404).json({ status: 404, message: "Data tidak ditemukan, sepertinya anda belum menambahkan data timeline", data: null });
            return;
        }
        res.json({ status: 200, message: "Permintaan anda sukses diproses, Data berhasil didapatkan", data: timelines });
        return;
    }catch (error) {
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const num = await Timeline.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).json({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    }else if (num == 0) {
        res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    const { tahun, detail_tahun } = req.body;
    if (!tahun || !detail_tahun) {
        res.status(400).json({ status: 400, message: "Permintaan anda tidak dapat diproses, Data tidak lengkap", data: null });
        return;
    }
    try {
        const updateTimeline = await Timeline.update(req.body, { where: { id: id } });
        res.json({ status: 200, message: "Permintaan anda sukses diproses, Data berhasil diubah", data: updateTimeline });
    }catch (error) {
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    const num = await Timeline.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).json({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    }else if (num == 0) {
        res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const deleteTimeline = await Timeline.destroy({ where: { id: id } });
        res.json({ status: 200, message: "Permintaan anda sukses diproses, Data berhasil dihapus", data: deleteTimeline });
    }catch (error) {
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}
