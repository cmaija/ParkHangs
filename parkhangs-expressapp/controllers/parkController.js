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
    getParkById,
};
