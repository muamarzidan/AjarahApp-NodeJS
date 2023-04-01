const timelineController = require('../controllers/timeline');
const router = require('express').Router();

router.get("/", timelineController.getAll);
router.post("/", timelineController.create);
router.get("/id/:id", timelineController.getById);
router.put("/:id", timelineController.update);
router.delete("/:id", timelineController.delete);

module.exports = router;