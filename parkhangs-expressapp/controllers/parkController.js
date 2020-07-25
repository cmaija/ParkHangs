const Park = require('../models/ParkModel');

const express = require('express');
const Request = require("request");

const getParks = async (req, res) => {

    await Park.find({}, (err, parks) => {

        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!parks.length) {

            return res
                .status(404)
                .json({success: false, error: `Parks not found`})
        }

        return res.status(200).json({success: true, data: parks})


    }).catch(err => console.log(err))

}

// Adds a new event
const addRating = async (req, res) => {
  var parkId = req.body.parkId;
  var rating = req.body.rating;
    // console.log(newEvent.parkId);

    try {
        res.setHeader('Content-Type', 'application/json');
        let inserted = await database.collection('events').update( { _id: parkId },{ $push: { "ratings": rating } });
        assert.equal(1, inserted.insertedCount);
        console.log('rating added');
        return res.status(200).json({success: true, data: newEvent})
    } catch (error) {
        return res.status(404).json({success: false, error: 'Could not add rating'})
    }
}

module.exports = {
    getParks,
    addRating
};
