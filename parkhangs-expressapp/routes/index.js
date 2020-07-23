var express = require('express');
const controller = require('../controllers/index');
const eventController = require('../controllers/eventController');
const parkCommentController = require('../controllers/parkCommentController');
const eventCommentController = require('../controllers/eventCommentController');
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
router.post('/events', eventController.addEvent);
router.get('/parkComments', parkCommentController.getParkComments);
router.post('/parkComments', parkCommentController.addParkComment);
router.delete('/parkComments', parkCommentController.deleteParkComment);
router.get('/eventComments', eventCommentController.getEventComments);
router.post('/eventComments', eventCommentController.addEventComment);
router.delete('/eventComments', eventCommentController.deleteEventComment);

module.exports = router;
