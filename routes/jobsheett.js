const jobSheetController = require('../controllers/jobsheet')
const router = require('express').Router()

router.post('/submitOne', jobSheetController.submitOne)
router.post('/submitMany', jobSheetController.submitMany)

module.exports = router;