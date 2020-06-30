var express = require('express');
const controller = require('../controllers/index');
const eventController = require('../controllers/eventController');
var assert = require('assert');
var mongoose = require("mongoose");

var router = express.Router();
router.use(express.json())

//PLACE ROUTES HERE!
router.get('/parks', controller.getParks);
router.get('/events', eventController.getEvents);
router.post('/events',eventController.addEvent);

module.exports = router;
