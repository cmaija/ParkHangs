var express = require('express');
const controller = require('../controllers/index');

var router = express.Router();

//PLACE ROUTES HERE!
router.get('/parks', controller.getParks);

module.exports = router;
