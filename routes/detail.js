const express = require('express');
const router = express.Router();
const detailController = require('../controllers/detail');
const multer = require("multer");
const fs = require('fs');
const path = require('path');
// const storage = multer.memoryStorage();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  });
  
  const fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  };
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
  });
  

router.get('/', detailController.getAll);
router.post('/', upload.single('image'), detailController.create);
router.get('/id/:id', detailController.getById);
router.put('/:id', detailController.update);
router.delete('/:id', detailController.delete);

module.exports = router;