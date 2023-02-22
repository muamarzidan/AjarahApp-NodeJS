const quizcontroller = require('../controllers/quiz');
const router = require('express').Router();

router.get('/', quizcontroller.getAll);
router.post('/', quizcontroller.create);
router.get('/:id', quizcontroller.getById);
router.put('/:id', quizcontroller.update);
router.delete('/:id', quizcontroller.delete);

module.exports = router;