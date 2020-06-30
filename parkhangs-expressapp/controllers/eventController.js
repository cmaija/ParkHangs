const Event = require('../models/EventModel')
const express = require('express');
const Request = require("request");
var assert = require('assert');
var mongoose = require( 'mongoose' );
//var { uuid } = require('uuidv4');

var router = express.Router();
router.use(express.json())

var uri = "mongodb://localhost:9000/events";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

// Get all events
const getEvents = async (req, res) => {
    await Event.find({}, (err, events) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!events.length) {
            return res
                .status(404)
                .json({success: false, error: `Events not found`})
        }
        return res.status(200).json({success: true, data: events})
    }).catch(err => console.log(err))
};

// Add an event
const addEvent = function (req, res) {
  if (err) {
      return res.status(400).json({success: false, error: err})
  }
  var newEvent = req.body;
  // newEvent.id = uuid();
  res.setHeader('Content-Type', 'application/json');
  connection.collection('events').insertOne(newEvent);
  console.log('item inserted :)');
  return res.status(200).json({success: true, data: newEvent})
}

// var newEvent = {
//   parkId: req.body.parkId,
//   eventId: req.body.eventId,
//   details: req.body.details,
//   eventDateTime: req.body.eventDateTime,
//   createdDateTime: req.body.createdDateTime,
//   creatorName: req.body.creatorName,
//   creatorID: req.body.creatorID,
//   __v: req.body.__v
// };


module.exports = {
    getEvents,
    addEvent
};
