const db = require('../models');
const Detail = db.details;
  
exports.create = async (req, res) => {
  if (!req.file || !req.body.nama || !req.body.pasangan || !req.body.tempat_lahir || !req.body.tanggal_lahir || !req.body.wafat || !req.body.deskripsi) {
    res.status(400).json({ status: 400, message: "Permintaan anda tidak dapat diproses, Data tidak lengkap", data: null });
    return;
  }
  try {
    const newDetail = {
      nama: req.body.nama,
      pasangan: req.body.pasangan,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      wafat: req.body.wafat,
      deskripsi: req.body.deskripsi,
      image: req.file.path,
    };
    const CreateDetail = await Detail.create(newDetail);
    res.status(201).json({ status: 201, message: "Permintaan anda sukses diproses, Data berhasil dibuat", data: CreateDetail });
  }catch (error) {
    res.json({ status: 500, message: error.message || "Server Error", data: null });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  const num = await Detail.count({ where: { id: id } });
  if (isNaN(id)) {
    res.status(400).json({ status: 400, message: "Id harus berupa angka", data: null });
    return;
  }else if (num == 0) {
    res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
    return;
  }
  try {
    const GetOneDetail = await Detail.findByPk(id, { rejectOnEmpty: true });
    res.json({ status: 200, message: "Permintaan anda sukses diproses, Data berhasil didapatkan", data: GetOneDetail });
  }catch (error) {
    res.json({ status: 500, message: error.message || "Server Error", data: null });
  }
};

exports.getAll = async (req, res) => {
  try {
    const details = await Detail.findAll();
    if (details.length == 0) {
      res.status(404).json({ status: 404, message: "Data tidak ditemukan, sepertinya anda belum menambahkan data detail", data: null });
      return;
    }
    res.json({ status: 200, message: "Permintaan anda sukses diproses, Data berhasil didapatkan", data: details });
    return;
  }catch (error) {
    res.json({ status: 500, message: error.message || "Server Error", data: null });
  }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const num = await Detail.count({ where: { id: id } });
    if (isNaN(id)) {
      res.json(400).json({ status: 400, message: "Id harus berupa angka", data: null });
      return;
    }else if (num == 0) {
      res.json(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
      return;
    } 
    const { nama, pasangan, tempat_lahir, tanggal_lahir, wafat, deskripsi } = req.body;
    const image = req.file ? req.file.path : null;
    if (!nama || !pasangan || !tempat_lahir || !tanggal_lahir || !wafat || !deskripsi || !image) {
      res.status(400).json({ status: 400, message: "Sepertinya ada data yang tidak lengkap", data: null });
      return;
    }
    try {
      const updateDetail = await Detail.update({nama, pasangan, tempat_lahir, tanggal_lahir, wafat, deskripsi, image }, { where: { id: id } });
      res.json({ message: `Permintaan anda sukses diproses, Data dengan id ${id} berhasil diupdate`, data: updateDetail });
    }catch (error) {
      res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    const num = await Detail.count({ where: { id: id } });
    if (isNaN(id)) {
      res.status(404).json({ status: 400, message: "Id harus berupa angka", data: null });
      return;
    }else if (num == 0) {
      res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
      return;
    }
    try {
        const deleteDetail = await Detail.destroy({ where: { id: id } });
        res.json({ message: `Permintaan anda sukses diproses, Data dengan id ${id} berhasil dihapus`, data: deleteDetail });
    }catch (error) {
      res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}