const jobsheetcontroller = require('../controllers/jobsheet');
const router = require('express').Router();

router.post('/submitone', jobsheetcontroller.submitOne);
router.post('/submitmany', jobsheetcontroller.submitMany);

module.exports = router;