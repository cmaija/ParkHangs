const ParkComment = require('../models/ParkCommentModel');
const express = require('express');
var assert = require('assert');
var mongoose = require('mongoose');
const database = require('../database/index');
const moment = require('moment');

var router = express.Router();
router.use(express.json())

// Gets all park comments
const getParkComments = async (req, res) => {
    await ParkComment.find({}, (err, parkComments) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!parkComments.length) {
            if (parkComments.length === 0) {
                return res.status(200).json({success: true, data: []})
            }

            return res.status(404).json({success: false, error: `Park comments not found`})
        }

        return res.status(200).json({success: true, data: parkComments})

    }).catch(err => console.log(err))
};

// Adds a new park comment
const addParkComment = async (req, res) => {
    const user = req.body.user;
    const commentDetails = req.body.newComment;

    var newParkComment = {
        parkId: commentDetails.parkId ? commentDetails.parkId : null,
        comment: commentDetails.comment ? commentDetails.comment : null,
    }

    if (newParkComment.parkId === null || newParkComment.comment === null) {
        return res.status(400).json({success: false, error: `Missing one or more fields`})
    }

    var now = moment(new Date(), 'hh:mm D MM YY').unix()
    newParkComment.createdDateTime = now;

    if (user != null) {
        newParkComment.creatorName = user.firstName + " " + user.lastName;
        newParkComment.creatorID = user._id;
    } else {
        newParkComment.creatorName = "anonymous";
        newParkComment.creatorID = 0;
    }

    try {
        res.setHeader('Content-Type', 'application/json');
        let inserted = await database.collection('parkComments').insertOne(newParkComment);
        assert.equal(1, inserted.insertedCount);
        return res.status(200).json({success: true, data: newParkComment})
    } catch (error) {
        return res.status(404).json({success: false, error: 'Could not add park comment'})
    }
}

// delete a park comment with given id
const deleteParkComment = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.parkCommentId)) {
        return res.status(400).json({success: false, error: `The provided id is not valid`})
    }
    try {
        commentToDelete = await ParkComment.findByIdAndDelete(
            mongoose.Types.ObjectId(req.params.parkCommentId))
        return res.status(200).json({success: true, data: commentToDelete})
    } catch (error) {
        return res.status(404).json({success: false, error: `Could not find and delete the park comment with that id`})
    }
}

module.exports = {
    getParkComments,
    addParkComment,
    deleteParkComment
};
