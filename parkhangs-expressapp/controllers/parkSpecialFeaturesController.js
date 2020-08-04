const ParkSpecialFeature = require('../models/ParkSpecialFeatureModel')
const express = require('express')

const getParkSpecialFeatures = async (req, res) => {
    try {
        const features = await ParkSpecialFeature.find({})
        return res.status(200).json({
            success: true,
            data: features,
        })
    } catch (error) {
        console.log(error)
        return res
            .status(404)
            .json({success: false, error: `Could not get all the special features`})
    }

}

module.exports = {
    getParkSpecialFeatures,
}
