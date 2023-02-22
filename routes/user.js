const userController = require('../controllers/user');
const router = require('express').Router();

router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/id/:id', userController.getById);
router.delete('/:id', userController.delete);

module.exports = router;