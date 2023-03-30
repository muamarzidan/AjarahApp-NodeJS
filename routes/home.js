const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homee');


router.get('/', HomeController.getAll);
router.post('/', HomeController.create);
router.get('/id/:id', HomeController.getById);
router.delete('/:id', HomeController.delete);
router.put('/:id', HomeController.update);

module.exports = router;
