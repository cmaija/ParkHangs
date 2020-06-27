var express = require('express');
const controller = require('../controllers/index');

var router = express.Router();

//PLACE ROUTES HERE!
router.get('/parks', controller.getParks);
router.get('/:parkId/events', controller.getEventsByPark)

module.exports = router;
