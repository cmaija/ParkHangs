const Facility = require('../models/FacilityModel')
const express = require('express')

const getFacilityTypes = async (req, res) => {
    try {
        const facilities = await Facility.find({})
        return res.status(200).json({
            success: true,
            data: facilities,
        })
    } catch (error) {
        console.log(error)
        return res
            .status(404)
            .json({success: false, error: `Could not get all the facility types`})
    }

}

module.exports = {
    getFacilityTypes,
}
