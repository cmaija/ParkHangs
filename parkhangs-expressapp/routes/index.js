var express = require('express');
const controller = require('../controllers/index');
const eventbyparkIdController = require('../controllers/getEventsByParkId');

var router = express.Router();

//PLACE ROUTES HERE!
router.get('/parks', controller.getParks);
router.get('/:parkId/events', eventbyparkIdController.getEventsByParkId);

module.exports = router;
