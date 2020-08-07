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
                googleMapsLatLon: park.googleMapsLatLon.coordinates,
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
        let userHasRated = false
        const user = ratingUserPair.user
        let usersRating = parkToUpdate.ratings.find(rating => rating.user === user)
        if (!!usersRating) {
            userHasRated = true
        }

        if (userHasRated) {
            parkToUpdate.ratings = parkToUpdate.ratings.filter(rating => rating.user !== user)
        }

        parkToUpdate.ratings.push(ratingUserPair)
        const ratings = parkToUpdate.ratings
        let ratingSum = ratings.reduce((acc, rating) =>  {
          return acc += rating.rating
        }, 0)

        let averageRating = ratingSum/ratings.length
        if (Number.isNaN(averageRating)) {
            averageRating = 0
        } else {
            averageRating = Math.round(averageRating * 10) / 10
        }

        parkToUpdate.averageRating = averageRating
    } catch (error) {
        console.error(error)
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
        let park = await Park.findOne({_id: parkId})
        park.googleMapsLatLon = park.googleMapsLatLon.coordinates
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
            let park = await Park.find({name: query.name})
            park = park.map((park) => {
                return {
                    name: park.name,
                    parkId: park.parkId,
                    _id: park._id,
                    googleMapsLatLon: park.googleMapsLatLon.coordinates,
                }
            })
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
        hasWashrooms: query.hasWashrooms !== undefined ? parseWashroomQuery(query.hasWashrooms) : undefined,
        facilities: query.facilities !== undefined ? parseFacilitiesFromQuery(query.facilities) : undefined,
        specialFeatures: query.specialFeatures !== undefined ? parseSpecialFeaturesFromQuery(query.specialFeatures) : undefined,
        googleMapsLatLon: queryHasLatLon(query) ? parseLatLon(query) : undefined
    }

    let queryObject = {
        hectares: incomingQuery.size,
        averageRating: incomingQuery.rating,
        hasWashrooms: incomingQuery.hasWashrooms,
        facilities: incomingQuery.facilities,
        specialFeatures: incomingQuery.specialFeatures,
        googleMapsLatLon: incomingQuery.googleMapsLatLon,
    }

    for (let query of Object.keys(queryObject)) {
        if (queryObject[query] === undefined) {
            delete queryObject[query]
        }
    }

    try {
        let foundParks = await Park.find(queryObject)
        foundParks = foundParks.map((park) => {
            return {
                name: park.name,
                parkId: park.parkId,
                _id: park._id,
                googleMapsLatLon: park.googleMapsLatLon.coordinates,
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
            .json({success: false, error: `Query: ${query.toString()} was unsuccessful`})
    }
}

function parseWashroomQuery (query) {
    if (typeof query === 'string') {
        return JSON.parse(query)
    }
    return query
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
    if (typeof parsedQuery === 'string') {
        try {
             parsedQuery = JSON.parse(parsedQuery)
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
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
    if (typeof parsedQuery === 'string') {
        try {
             parsedQuery = JSON.parse(parsedQuery)
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    parsedQuery = parsedQuery.map((featureType) => {
        return {
            '$elemMatch': { feature: featureType }
        }
    })
    return { $all: parsedQuery }
}

function queryHasLatLon (query) {
    const lat = parseFloat(query.lat)
    const lon = parseFloat(query.lon)
    const distance = parseFloat(query.distance)
    return lat && lon && distance && distance > 0
}

function parseLatLon (query) {
    const lat = parseFloat(query.lat)
    const lon = parseFloat(query.lon)
    const distance = parseFloat(query.distance)
    const earthRadiusInKilometers = 6371
    return { '$geoWithin': { $centerSphere: [ [ lon, lat ], distance / earthRadiusInKilometers ] } }
}

module.exports = {
    getParks,
    addRating,
    getParkById,
    queryParks,
    getParksSimple,
}
