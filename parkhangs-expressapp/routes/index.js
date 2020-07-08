var express = require('express');
const controller = require('../controllers/index');
const eventController = require('../controllers/eventController');
var assert = require('assert');
var mongoose = require("mongoose");
const eventbyparkIdController = require('../controllers/getEventsByParkId');

var router = express.Router();
router.use(express.json())

//PLACE ROUTES HERE!
router.get('/parks', controller.getParks);
router.get('/events', eventController.getEvents);
router.post('/events',eventController.addEvent);


router.get('/:parkId/events', eventbyparkIdController.getEventsByParkId);

module.exports = router;
