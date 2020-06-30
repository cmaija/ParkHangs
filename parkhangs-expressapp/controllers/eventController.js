const Event = require('../models/EventModel')
const moment = require('moment')
const express = require('express')
const mongoose = require('mongoose')

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
        details,
        eventDateTime } = req.body

    const update = {
        parkId: parkId ? parkId : null,
        details: details ? details : null,
        eventDateTime: eventDateTime ? eventDateTime : null,
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
    updateEvent,
    deleteEvent,
}
