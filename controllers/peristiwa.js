const db = require("../models");
const Peristiwa = db.peristiwas;

exports.create = async (req, res) => {
    // Validate request
    if (!req.file) {
      res.status(400).send({
        status: 400,
        message: "Data tidak lengkap",
        data: null,
      });
      return;
    }
    
    const image = req.file.path;
    // const imageBuffer = image.buffer;
    const kejadian = req.body.kejadian;
    const deskripsi = req.body.deskripsi;


  
    // Convert image to base64
    // const imageBase64 = Buffer.from(imageBuffer).toString('base64');
  
    try {
      // tambahkan record ke database
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

// exports.create = (req, res) => {
//     // Validate request
//     if (!req.file || !req.body.kejadian || !req.body.deskripsi) {
//         res.status(400).send({
//         status: 400,
//         message: "Sepertinya ada data yang kosong, coba ulang dan tidak boleh kosong!",
//         data: null,
//         });
//         return;
//     }
//     const peristiwa = {
//         image: req.body.image,
//         kejadian: req.body.kejadian,
//         deskripsi: req.body.deskripsi,
//     };
//     try {
//         const newPeristiwa = Peristiwa.create(peristiwa);
//         res.status(201).send({ status: 201, message: "Suksess, Data peristiwa berhasil ditambahkan", data: newPeristiwa});
//     } catch (error) {
//         res.status(500).send({ status: 500, message: error.message || "Server Error", data: null,});
//     }
// };

exports.getAll = async (req, res) => {
    try {
        // ambil semua data peristiwa dari database
        const peristiwas = await Peristiwa.findAll();
    
        // // tambahkan base64 encoded image ke setiap peristiwa
        // const peristiwasWithEncodedImage = peristiwas.map((peristiwa) => {
        //   const encodedImage = Buffer.from(peristiwa.image).toString("base64");
        //   return {
        //     id: peristiwa.id,
        //     kejadian: peristiwa.kejadian,
        //     deskripsi: peristiwa.deskripsi,
        //     image: encodedImage,
        //   };
        // });
    
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
