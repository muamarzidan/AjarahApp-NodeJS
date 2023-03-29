const db = require('../models');
const Detail = db.details;
  
exports.create = async (req, res) => {
  try {
    const { nama, pasangan, tempat_lahir, tanggal_lahir, wafat, deskripsi } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!nama || !pasangan || !tempat_lahir || !tanggal_lahir || !wafat || !deskripsi || !image) {
      res.json({ status: 400, message: "Data tidak lengkap", data: null });
      return;
    }

    const createDetail = await Detail.create({
      nama,
      pasangan,
      tempat_lahir,
      tanggal_lahir,
      wafat,
      deskripsi,
      image,
    });
    res.json({ status: 201, message: "Data berhasil dibuat", data: createDetail });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message || "Server Error", data: null });
  }
};

exports.getById = async (req, res) => {
    try {
        const detail = await Detail.findByPk(req.params.id);
        if (!detail) {
          return res.status(404).json({
            status: 404,
            message: 'Detail not found',
            data: null
          });
        }
    
        const data = {
          nama: detail.nama,
          wafat: detail.wafat,
          tanggal_lahir: detail.tanggal_lahir,
          image: detail.image,
        };
    
        res.status(200).json({
          status: 200,
          message: 'Success',
          data: data
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          status: 500,
          message: error.message,
          data: null
        });
      }
  };
  
  

  exports.getAll = async (req, res) => {
    try {
      const details = await Detail.findAll();
  
      const detailsWithImage = details.map(detail => {
        // const imagePath = path.join(__dirname, '../public/images', detail.image.toString());
        const imageUrl = '/images/' + detail.image;
        return {
          id: detail.id,
          nama: detail.nama,
          deskripsi: detail.deskripsi,
          image: detail.image,
          im: imageUrl,
          created_at: detail.created_at,
          updated_at: detail.updated_at
        };
      });
  
      res.status(200).json({ status: 200, message: "Data berhasil didapatkan", data: detailsWithImage });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message || "Server Error", data: null });
    }
  };



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