const db = require("../models");
const Peristiwa = db.peristiwas;

exports.create = async (req, res) => {
  if (!req.file || !req.body.kejadian || !req.body.deskripsi || !req.body.deskripsiOption || !req.body.deskripsiOption2) {
    res.status(400).send({ status: 400, message: "Sepertinya ada data yang tidak lengkap", data: null });
    return;
  }
  const NewPeristiwa = {
    image: req.file.path,
    kejadian: req.body.kejadian,
    deskripsi: req.body.deskripsi,
    deskripsiOption: req.body.deskripsiOption,
    deskripsiOption2: req.body.deskripsiOption2,
  }
  
  // if wanna convert into base64
  // const imageBase64 = Buffer.from(image).toString('base64');

  try {
    const CreatePeristiwa = await Peristiwa.create(NewPeristiwa);
    res.status(201).send({ status: 201, message: "Permintaan anda sukses diproses, Data peristiwa berhasil ditambahkan", data: CreatePeristiwa });
  } catch (error) {
    console.error(error);
    res.json({ status: 500, message: error.message || "Server Error", data: null });
  };
};

exports.getAll = async (req, res) => {
  try {
    const peristiwas = await Peristiwa.findAll();
    if (peristiwas.length == 0) {
      res.status(404).send({ status: 404, message: "Permintaan anda sukses diproses, Tapi data peristiwa belum ada", data: null });
      return;
    }
    res.json({ status: 200, message: "Permintaan anda sukses diproses, Data peristiwa berhasil ditemukan", data: peristiwas});
  } catch (error) {
    res.json({ status: 500, message: error.message || "Server Error", data: null});
  };
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  const num = await Peristiwa.count({ where: { id: id } });
  if (isNaN(id)) {
    res.status(400).send({ status: 400, message: "Id harus berupa angka", data: null });
    return;
  } else if (num == 0) {
    res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
    return;
  }
  try {
    const OnePeristiwa = await Peristiwa.findByPk(id, { rejectOnEmpty: true });
    res.json({ status: 200, message: `Permintaan anda sukses diproses, data dengan ${id} berhasil ditemukan`, data: OnePeristiwa });
  } catch (error){
      res.send({ status: 500, message: error.message || "Server Error", data: null });
  };
};

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
    const {id} = req.params;
    const num = await Peristiwa.count({ where: { id: id } });
    if (isNaN(id)) {
      res.status(400).json({ status: 400, message: "Id harus berupa angka", data: null });
      return;
    } else if (num == 0) {
      res.json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
      return;
    }
    const { kejadian, deskripsi, deskripsiOption, deskripsiOption2 } = req.body;
    if (!kejadian || !deskripsi || !deskripsiOption || !deskripsiOption2) {
      res.status(400).json({ status: 400, message: "Data tidak lengkap bro", data: null });
      return;
    }
    const updatedPeristiwa = await Peristiwa.update({ kejadian, deskripsi, deskripsiOption, deskripsiOption2},{ where: { id: id }});
    res.json({ status: 200, message: `Permintaan anda sukses diproses, data dengan id ke${id} berhasil diperbarui`, data: updatedPeristiwa });
  } catch (error) {
    res.json({ status: 500, message: error.message || "Server Error", data: null });
  }
};


exports.delete = async (req, res) => {
    const id = req.params.id;
    const num = await Peristiwa.count({ where: { id: id } });
    if (isNaN(id)) {
      res.status(400).json({ status: 400, message: "Id harus berupa angka", data: null });
      return;
    } else if (num == 0) {
      res.status(404).json({ status: 404, message: `Data dengan id ${id} tidak ditemukan`, data: null });
      return;
    }
    try {
      const deletePeristiwa = await Peristiwa.destroy({ where: { id: id } });
      res.json({ status: 200, message: `Permintaan anda sukses diproses, data dengan id ${id} berhasil dihapus`, data: deletePeristiwa });
    } catch (error) {
      res.json({ status: 500, message: error.message || "Server Error", data: null });
    }
}
