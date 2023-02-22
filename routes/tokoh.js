const tokohController = require('../controllers/tokoh');
const router = require('express').Router();

router.get('/', tokohController.getAll);
router.post('/', tokohController.create);
router.get('/id/:id', tokohController.getById);
router.put('/:id', tokohController.update);
router.delete('/:id', tokohController.delete);

module.exports = router;