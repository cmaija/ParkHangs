var express = require('express');
const controller = require('../controllers/index');

var router = express.Router();

//PLACE ROUTES HERE!
router.get('/parks', controller.getParks);
router.patch('/events/:eventId', controller.updateEvent)
router.delete('/events/:eventId', controller.deleteEvent)

module.exports = router;
