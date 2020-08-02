const Park = require('../models/ParkModel');
const express = require('express');
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

const getParksSimple = async (req, res) => {
    try {
        let parks = await Park.find({})
        parks = parks.map((park) => {
            return {
                name: park.name,
                parkId: park.parkId,
                _id: park._id,
                googleMapsLatLon: park.googleMapsLatLon,
            }
        })
        return res.status(200).json({success: true, data: parks})
    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, error: error})
    }
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

const queryParks = async (req, res) => {
    const query = req.query
    // if the query specifies a park name, just search for that specific park
    if (query.name) {
        try {
            const park = await Park.find({name: query.name})
            return res.status(200).json({
                success: true,
                data: park,
            })

        } catch (error) {
            console.error(error)
            return res
                .status(404)
                .json({success: false, error: `Park with name ${query.name} not found`})
        }
    }
    // otherwise, construct a complex query with all the provided parameters.
    let incomingQuery = {
        size: queryHasSizeFilters(query) ? parseSizeFromQuery(query) : undefined,
        rating: queryHasRatingFilters(query) ? parseRatingFromQuery(query) : undefined,
        hasWashrooms: query.hasWashrooms !== undefined ? query.hasWashrooms : undefined,
        facilities: query.facilities !== undefined ? parseFacilitiesFromQuery(query.facilities) : undefined,
        specialFeatures: query.specialFeatures !== undefined ? parseSpecialFeaturesFromQuery(query.specialFeatures) : undefined,
    }

    let queryObject = {
        hectares: incomingQuery.size,
        rating: incomingQuery.rating,
        hasWashrooms: incomingQuery.hasWashrooms,
        facilities: incomingQuery.facilities,
        specialFeatures: incomingQuery.specialFeatures,
    }
    for (let query of Object.keys(queryObject)) {
        if (queryObject[query] === undefined) {
            delete queryObject[query]
        }
    }
    try {
        const foundParks = await Park.find(queryObject)
        foundParks = foundParks.map((park) => {
            return {
                name: park.name,
                parkId: park.parkId,
                _id: park._id,
                googleMapsLatLon: park.googleMapsLatLon,
            }
        })
        return res.status(200).json({
                success: true,
                data: foundParks,
            })
    } catch (error) {
        console.error(error)
        return res
            .status(404)
            .json({success: false, error: `Park with name ${query.name} not found`})
    }
}

function queryHasSizeFilters (query) {
    const hasGreaterThan = query.sizeGte !== undefined
    const hasLessThan = query.sizeLte !== undefined
    const hasEqual = query.sizeEq !== undefined

    return hasGreaterThan || hasLessThan || hasEqual
}

function queryHasRatingFilters (query) {
    const hasGreaterThan = query.ratingGte !== undefined
    const hasLessThan = query.ratingLte !== undefined
    const hasEqual = query.ratingEq !== undefined

    return hasGreaterThan || hasLessThan || hasEqual
}

function parseSizeFromQuery (query) {
    let parsedQuery = {}
    const hasGreaterThan = query.sizeGte !== undefined
    const hasLessThan = query.sizeLte !== undefined
    const hasEqual = query.sizeEq !== undefined

    if (hasEqual) {
        return query.sizeEq
    }
    if (hasGreaterThan) {
        parsedQuery['$gte'] = query.sizeGte
    }
    if (hasLessThan) {
        parsedQuery['$lte'] = query.sizeLte
    }

    return parsedQuery
}

function parseRatingFromQuery (query) {
    let parsedQuery = {}
    const hasGreaterThan = query.ratingGte !== undefined
    const hasLessThan = query.ratingLte !== undefined
    const hasEqual = query.ratingEq !== undefined

    if (hasEqual) {
        return query.ratingEq
    }
    if (hasGreaterThan) {
        parsedQuery['$gte'] = query.ratingGte
    }
    if (hasLessThan) {
        parsedQuery['$lte'] = query.ratingLte
    }

    return parsedQuery
}

function parseFacilitiesFromQuery (facilitiesQuery) {
    let parsedQuery = facilitiesQuery
    try {
         parsedQuery = JSON.parse(parsedQuery)
    } catch (error) {
        console.error(error)
        console.log('failed to parse JSON')
    }

    parsedQuery = parsedQuery.map((facilityType) => {
        return {
            '$elemMatch': { facilityType: facilityType }
        }
    })
    return { $all: parsedQuery }
}

function parseSpecialFeaturesFromQuery (featuresQuery) {
    let parsedQuery = featuresQuery
    try {
         parsedQuery = JSON.parse(parsedQuery)
    } catch (error) {
        console.error(error)
        console.log('failed to parse JSON')
    }

    parsedQuery = parsedQuery.map((featureType) => {
        return {
            '$elemMatch': { feature: featureType }
        }
    })
    return { $all: parsedQuery }
}
module.exports = {
    getParks,
    addRating,
    getParkById,
    queryParks,
    getParksSimple,
}
