var express = require('express');
const parkController = require('../controllers/parkController');
const eventController = require('../controllers/eventController');
const userController = require('../controllers/userController');
const parkCommentController = require('../controllers/parkCommentController');
const eventCommentController = require('../controllers/eventCommentController');
var assert = require('assert');
var mongoose = require("mongoose");
const eventbyparkIdController = require('../controllers/getEventsByParkId');

var router = express.Router();
router.use(express.json())

//PLACE ROUTES HERE!
router.get('/parks', parkController.getParks);
router.get('/parks/:parkId', parkController.getParkById);

router.patch('/events/:eventId', eventController.updateEvent);
router.delete('/events/:eventId', eventController.deleteEvent);
router.get('/events', eventController.getEvents);
router.post('/events', eventController.addEvent);

router.get('/user/:email', userController.getUser);
router.patch('/user/:userId', userController.updateUser);
router.post('/user', userController.addUser);

router.get('/parkComments', parkCommentController.getParkComments);
router.post('/parkComments', parkCommentController.addParkComment);
router.delete('/parkComments/:parkCommentId', parkCommentController.deleteParkComment);
router.get('/eventComments', eventCommentController.getEventComments);
router.post('/eventComments', eventCommentController.addEventComment);
router.delete('/eventComments/:eventCommentId', eventCommentController.deleteEventComment);


module.exports = router;
