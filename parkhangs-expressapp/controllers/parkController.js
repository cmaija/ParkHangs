const Park = require('../models/ParkModel');

const express = require('express');
const Request = require("request");
var mongoose = require('mongoose');

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

// Adds a new rating
const addRating = async (req, res) => {
  var parkId = req.body.parkId;
  var ratingUserPair = req.body.rating;

  let parkToUpdate = {}

  try {
      parkToUpdate = await Park.findById(mongoose.Types.ObjectId(parkId))
  } catch (error) {
    return res.status(404).json({success: false,error: `Could not find the park with that id`})
  }
  try {
    parkToUpdate.ratings.push(ratingUserPair)
  } catch (error) {
    return res.status(404).json({success: false,error: `Could not add rating to park`})
  }

  try {
    res.setHeader('Content-Type', 'application/json');
    const updatedPark = await parkToUpdate.save()
    if (!updatedPark) {
        return res.status(404).json({success: false,error: 'Could not update the park with the rating'})
    }
    return res.status(200).json({success: true, data: updatedPark})
  } catch (error) {
      return res.status(404).json({success: false, error: 'Could not add updated park to db'})
  }
}

const getParkById = async (req, res) => {
    const parkId = req.params.parkId
    try {
        const park = await Park.findOne({_id: parkId})
        return res.status(200).json({
            success: true,
            data: park,
        })
    } catch (error) {
        return res
            .status(404)
            .json({success: false, error: `Park not found`})
    }
}

module.exports = {
    getParks,
    addRating,
    getParkById
};
