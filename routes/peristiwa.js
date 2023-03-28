const peristiwaController = require('../controllers/peristiwa');
const router = require('express').Router();

router.get("/", peristiwaController.getAll);
router.post("/", peristiwaController.create);
router.get("/id/:id", peristiwaController.getById);
router.put("/:id", peristiwaController.update);
router.delete("/:id", peristiwaController.delete);

module.exports = router;