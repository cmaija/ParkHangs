const Event = require('../models/EventModel');
const express = require('express');
var assert = require('assert');
var mongoose = require('mongoose');
const database = require('../database/index');
const moment = require('moment');

var router = express.Router();
router.use(express.json())

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

const getEventById = async (req, res) => {
    const eventId = req.params.eventId
    try {
        const event = await Event.findOne({_id: eventId})
        return res.status(200).json({
            success: true,
            data: event
        })
    } catch (error) {
        return res
            .status(404)
            .json({
                success: false,
                error: `event with id: ${eventId} not found`,
                message: error.toString()
            })
    }
}

// Adds a new event
const addEvent = async (req, res) => {

    const user = req.body.user;
    const eventDetails = req.body.newEvent;

    var newEvent = {
        parkId: eventDetails.parkId ? eventDetails.parkId : null,
        title: eventDetails.title ? eventDetails.title : null,
        details: eventDetails.details ? eventDetails.details : null,
        eventDateTime: eventDetails.eventDateTime ? eventDetails.eventDateTime : null,
        eventEndDateTime: eventDetails.eventEndDateTime ? eventDetails.eventEndDateTime : null, // not required
        favoritesCount: 0,
    }

    if (newEvent.parkId === null || newEvent.title === null || newEvent.details === null || newEvent.eventDateTime === null) {
        return res.status(400).json({success: false, error: `Missing one or more fields`})
    }

    // newEvent._id = uuid();
    // let d = new Date();
    // let strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
    var now = moment(new Date(), 'hh:mm D MM YY').unix()

    newEvent.createdDateTime = now;

    if (user != null) {
        newEvent.creatorName = user.firstName + " " + user.lastName;
        newEvent.creatorID = user._id;
    } else {
        newEvent.creatorName = "anonymous";
        newEvent.creatorID = 0;
    }

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

const updateEvent = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
        return res
            .status(400)
            .json({
                success: false,
                error: `The provided id is not valid`
            })
    }

    const {
        parkId,
        title,
        details,
        eventDateTime,
        eventEndDateTime,
    } = req.body

    const update = {
        parkId: parkId ? parkId : null,
        title: title ? title : null,
        details: details ? details : null,
        eventDateTime: eventDateTime ? eventDateTime : null,
        eventEndDateTime: eventEndDateTime ? eventEndDateTime : null
    }

    let eventToUpdate = {}

    try {
        eventToUpdate = await Event.findById(
            mongoose.Types.ObjectId(req.params.eventId))
    } catch (error) {
        return res
            .status(404)
            .json({
                success: false,
                error: `Could not find the event with that id`
            })
    }

    if (!eventToUpdate) {
        return res
            .status(404)
            .json({
                success: false,
                error: `Could not find the event with that id`
            })
    }

    try {
        Object.keys(update).forEach((param) => {
            if (update[param] !== null) {
                eventToUpdate[param] = update[param]
            }
        })

        const updatedEvent = await eventToUpdate.save()

        if (!updatedEvent) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'Could not update the event'
                })
        }

        return res
            .status(200)
            .json({
                success: true,
                data: updatedEvent,
            })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
        })
    }
}

const deleteEvent = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
        return res
            .status(400)
            .json({
                success: false,
                error: `The provided id is not valid`
            })
    }

    try {
        eventToDelete = await Event.findByIdAndDelete(
            mongoose.Types.ObjectId(req.params.eventId))
        return res
            .status(200)
            .json({
                success: true,
                data: eventToDelete,
            })
    } catch (error) {
        return res
            .status(404)
            .json({
                success: false,
                error: `Could not find and delete the event with that id`
            })
    }
}

module.exports = {
    getEvents,
    addEvent,
    deleteEvent,
    updateEvent,
    getEventById,
};
