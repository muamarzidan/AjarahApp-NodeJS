const db = require("../models");
const Peristiwa = db.peristiwas;

exports.create = async (req, res) => {
    if (!req.file) {
      res.status(400).send({
        status: 400,
        message: "Data tidak lengkap",
        data: null,
      });
      return;
    } else if (!req.body.kejadian || !req.body.deskripsi) {
      res.status(400).send({
        status: 400,
        message: "Data tidak lengkap",
        data: null,
      });
      return;
    }
    
    const image = req.file.path;
    const kejadian = req.body.kejadian;
    const deskripsi = req.body.deskripsi;
  
    // Convert image to base64
    // const imageBase64 = Buffer.from(imageBuffer).toString('base64');
  
    try {
      const newPeristiwa = await Peristiwa.create({
        image: image,
        kejadian: kejadian,
        deskripsi: deskripsi,
      });
  
      res.status(201).send({
        status: 201,
        message: "Sukses, Data peristiwa berhasil ditambahkan",
        data: newPeristiwa,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: 500,
        message: error.message || "Server Error",
        data: null,
      });
    }
  };

exports.getAll = async (req, res) => {
    try {
        const peristiwas = await Peristiwa.findAll();
        res.status(200).send({
          status: 200,
          message: "Sukses, Data peristiwa berhasil ditemukan",
          data: peristiwas,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({
          status: 500,
          message: error.message || "Server Error",
          data: null,
        });
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

// exports.update = async (req, res) => {
//     const id = req.params.id;
//     const num = await Peristiwa.count({ where: { id: id } });
//     if (isNaN(id)) {
//         res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
//         return;
//     } else if (num == 0) {
//         res.status(404).send({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
//         return;
//     }
//     try {
//         const updatePeristiwa = await Peristiwa.update(req.body, { where: { id: id } });
//         res.status(200).send({ status: 200, message: `Suksess data dengan id ${id} berhasil diupdate`, data: updatePeristiwa });
//     } catch (error) {
//         res.status(500).send({ status: 500, message: error.message || "Server Error", data: null });
//     }
// }

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { kejadian, deskripsi } = req.body;
    const image = req.file ? req.file.path : null;

    const peristiwa = await Peristiwa.findByPk(id);
    if (!peristiwa) {
      res.json({ status: 404, message: "Data tidak ditemukan", data: null });
      return;
    }

    // melakukan pengecekan kelengkapan data
    if (!kejadian || !deskripsi) {
      res.json({ status: 400, message: "Data tidak lengkap", data: null });
      return;
    }

    // memperbarui data peristiwa
    const updatedPeristiwa = await peristiwa.update({
      kejadian,
      deskripsi,
      image,
    });

    res.json({ status: 200, message: "Data berhasil diperbarui", data: updatedPeristiwa });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message || "Server Error", data: null });
  }
};


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
