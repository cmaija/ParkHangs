const Park = require('../models/index');

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

};

module.exports = {
    getParks
};