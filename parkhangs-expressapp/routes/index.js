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
router.patch('/events/:eventId', controller.updateEvent)
router.delete('/events/:eventId', controller.deleteEvent)
router.get('/events', eventController.getEvents);
router.post('/events',eventController.addEvent);
router.get('/:parkId/events', eventbyparkIdController.getEventsByParkId);
router.patch('/events/:eventId', controller.updateEvent)
router.delete('/events/:eventId', controller.deleteEvent)

module.exports = router;
