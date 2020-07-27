const EventComment = require('../models/EventCommentModel');
const express = require('express');
const Request = require("request");
var assert = require('assert');
var mongoose = require('mongoose');
const database = require('../database/index');
const moment = require('moment');

var router = express.Router();
router.use(express.json())

// Gets all event comments
const getEventComments = async (req, res) => {
    await EventComment.find({}, (err, eventComments) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!eventComments.length) {
            return res.status(404).json({success: false, error: `event comments not found`})
        }
        return res.status(200).json({success: true, data: eventComments})
    }).catch(err => console.log(err))
};

// Adds a new event comment
const addEventComment = async (req, res) => {
    const user = req.body.user;
    const commentDetails = req.body.newComment;

    var newEventComment = {
        eventId: commentDetails.eventId ? commentDetails.eventId : null,
        comment: commentDetails.comment ? commentDetails.comment : null,
    }

    if (newEventComment.eventId === null || newEventComment.comment === null) {
        return res.status(400).json({success: false, error: `Missing one or more fields`})
    }

    var now = moment(new Date(), 'hh:mm D MM YY').unix()
    newEventComment.createdDateTime = now;

    if (user != null) {
        newEventComment.creatorName = user.firstName + " " + user.lastName;
        newEventComment.creatorID = user._id;
    } else {
        newEventComment.creatorName = "anonymous";
        newEventComment.creatorID = 0;
    }

    try {
        res.setHeader('Content-Type', 'application/json');
        let inserted = await database.collection('eventComments').insertOne(newEventComment);
        assert.equal(1, inserted.insertedCount);
        return res.status(200).json({success: true, data: newEventComment})
    } catch (error) {
        return res.status(404).json({success: false, error: 'Could not add event comment'})
    }
}

// delete a event comment with given id
const deleteEventComment = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.eventCommentId)) {
        return res.status(400).json({success: false, error: `The provided id is not valid`})
    }

    try {
        eventToDelete = await EventComment.findByIdAndDelete(
            mongoose.Types.ObjectId(req.params.eventCommentId))
        return res.status(200).json({success: true, data: eventToDelete})
    } catch (error) {
        return res.status(404).json({success: false, error: `Could not find and delete the event comment with that id`})
      }
}

module.exports = {
    getEventComments,
    addEventComment,
    deleteEventComment
};
