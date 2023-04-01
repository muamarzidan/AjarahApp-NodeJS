const jobSheetController = require('../controllers/jobsheett')
const router = require('express').Router()

router.post('/submitOne', jobSheetController.submitOne)
router.post('/submitMany', jobSheetController.submitMany)

module.exports = router;