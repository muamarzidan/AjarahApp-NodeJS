const express = require('express');
const router = express.Router();
const detailController = require('../controllers/detail');

router.get('/', detailController.getAll);
router.post('/', detailController.create);
router.get('/id/:id', detailController.getById);
router.put('/:id', detailController.update);
router.delete('/:id', detailController.delete);

module.exports = router;