const Event = require('../models/EventModel');
const express = require('express');
const Request = require("request");
var assert = require('assert');
var mongoose = require( 'mongoose' );
const database = require('../database/index');
const moment = require('moment');
// var { uuid } = require('uuidv4');

var router = express.Router();
router.use(express.json())

database.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

// Gets all events
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

// Adds a new event
const addEvent = async (req, res) => {
    var {
      parkId,
      details,
      eventDateTime
    } = req.body
    var newEvent = {
      parkId: parkId ? parkId : null,
      details: details ? details : null,
      eventDateTime: eventDateTime ? eventDateTime : null,
    }
    // console.log(newEvent.parkId);
    // console.log(newEvent.details);
    // console.log(newEvent.eventDateTime);
    if (newEvent.parkId === null || newEvent.details === null || newEvent.eventDateTime === null) {
      return res.status(400).json({success: false,  error: `Missing one or more fields`})
    }

    // newEvent._id = uuid();
    // let d = new Date();
    // let strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
    var now = moment(new Date(), 'hh:mm D MM YY').unix()
    newEvent.createdDateTime = now;
    newEvent.creatorName = "user";
    newEvent.creatorID = 0;

    try {
      res.setHeader('Content-Type', 'application/json');
      let inserted = await database.collection('events').insertOne(newEvent);
      assert.equal(1, inserted.insertedCount);
      console.log('item inserted');
      return res.status(200).json({success: true, data: newEvent})
  } catch (error) {
    return res.status(404).json({success: false, error: 'Could not add event'})
  }
}

module.exports = {
    getEvents,
    addEvent
};
