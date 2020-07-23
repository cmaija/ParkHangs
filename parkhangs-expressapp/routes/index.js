var express = require('express');
const parkController = require('../controllers/parkController');
const eventController = require('../controllers/eventController');
const userController = require('../controllers/userController');
var assert = require('assert');
var mongoose = require("mongoose");
const eventbyparkIdController = require('../controllers/getEventsByParkId');

var router = express.Router();
router.use(express.json())

//PLACE ROUTES HERE!
router.get('/parks', parkController.getParks);
router.patch('/events/:eventId', eventController.updateEvent);
router.delete('/events/:eventId', eventController.deleteEvent);
router.get('/events', eventController.getEvents);
router.post('/events', eventController.addEvent);

router.get('/user/:email', userController.getUser);
router.patch('/user/:userId', userController.updateUser);
router.post('/user', userController.addUser);

module.exports = router;
