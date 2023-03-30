const db = require("../models");
const Home = db.homes;

exports.create = async (req, res) => {
    if (!req.body.herotext || !req.body.title1 || !req.body.title2 || !req.body.title3 || !req.body.title4) {
        res.status(400).json({
            status: 400,
            message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!",
            data: null
        });
        return;
    }
    const home = {
        herotext: req.body.herotext,
        title1: req.body.title1,
        title2: req.body.title2,
        title3: req.body.title3,
        title4: req.body.title4,
    }
    try {
        const newHome = await Home.create(home);
        console.log(newHome);
        res.status(201).json({ status: 201, message: "Suksess, Data home berhasil ditambahkan", data: newHome });
    }
    catch (error) {
        res.status(500).json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getAll = async (req, res) => {
    const num = await Home.findAll();
    if (num == 0) {
        res.status(404).json({ status: 404, message: `Data tidak ditemukan, sepertinya belum ada data yang dibuat`, data: null });
        return;
    }
    try {
        const seeHome = await Home.findAll();
        res.status(200).json({ status: 200, message: "Suksess, Semua data Home berhasil ditemukan", data: seeHome });
    }
    catch (error) {
        res.status(500).json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    const num = await Home.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).json({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const seeHome = await Home.findByPk(id, { rejectOnEmpty: true });
        res.status(200).json({ status: 200, message: `Suksess data dengan ${id} berhasil ditemukan`, data: seeHome });
    }
    catch (error) {
        res.status(500).json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    const num = await Home.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).json({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    try {
        const deleteHome = await Home.destroy({ where: { id: id } });
        res.status(200).json({ status: 200, message: `Suksess data dengan ${id} berhasil dihapus`, data: deleteHome });
    }
    catch (error) {
        res.status(500).json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const num = await Home.count({ where: { id: id } });
    if (isNaN(id)) {
        res.status(400).json({ status: 400, message: "Id harus berupa angka", data: null });
        return;
    } else if (num == 0) {
        res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
        return;
    }
    const home = {
        herotext: req.body.herotext,
        title1: req.body.title1,
        title2: req.body.title2,
        title3: req.body.title3,
        title4: req.body.title4,
    }
    if (!home.herotext || !home.title1 || !home.title2 || !home.title3 || !home.title4) {
        res.status(400).json({
            status: 400,
            message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!",
            data: null
        });
        return;
    }
    try {
        const updateHome = await Home.update(home, { where: { id: id } });
        res.json({ status: 200, message: `Suksess data dengan ${id} berhasil diupdate`, data: updateHome });
    }
    catch (error) {
        res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}