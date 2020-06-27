const Event = require('../models/EventModel');

const express = require('express');

const getEventsByPark = async (req, res) => {
    const { parkId } = req.params

    await Event.find(
        { parkId },
        (err, events) => {
            if (err) {
                return res.status(400).json({success: false, error: err})
            }
            if (!events) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        error: `Events not found`
                    })
            }
            return res
                .status(200)
                .json({
                    success: true,
                    data: events
                })
    }).catch(err => console.log(err))
};

module.exports = {
    getEventsByPark
}
