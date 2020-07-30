const Park = require('../models/ParkModel')
const express = require('express')

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

    let incomingQuery = {
        size: queryHasSizeFilters(query) !== undefined ? parseSizeFromQuery(query) : undefined,
        rating: queryHasRatingFilters(query) !== undefined ? parseRatingFromQuery(query) : undefined,
        hasWashrooms: query.hasWashrooms !== undefined ? query.hasWashrooms : undefined,
        facilities: query.facilitites !== undefined ? parseFacilitiesFromQuery(query.facilities) : undefined,
        specialFeatures: query.specialFeatures !== undefined ? parseSpecialFeaturesFromQuery(query.specialFeatures) : undefined,
    }

    console.log(incomingQuery)

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

    console.log('this is the query object I would like to send to mongoose')
    console.log(queryObject)
    try {
        const foundParks = await Park.find(queryObject)
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
    console.log('has size filters??')
    const hasGreaterThan = query.sizeGte !== undefined
    const hasLessThan = query.sizeLte !== undefined
    const hasEqual = query.sizeEq !== undefined

    return hasGreaterThan || hasLessThan || hasEqual
}

function queryHasRatingFilters (query) {
    console.log('has rating filters??')
    console.log(query)
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
        query['$gte'] = query.sizeGte
    }
    if (hasLessThan) {
        query['$lte'] = query.sizeLte
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
        query['$gte'] = query.ratingGte
    }
    if (hasLessThan) {
        query['$lte'] = query.ratingLte
    }

    return parsedQuery
}

function parseFacilitiesFromQuery (facilitiesQuery) {
    console.log(facilitiesQuery)
    return {
        $all: [...facilitiesQuery]
    }
}

function parseSpecialFeaturesFromQuery (featuresQuery) {
    console.log(featuresQuery)
    return {
        $all: [...featuresQuery]
    }
}
module.exports = {
    getParks,
    getParkById,
    queryParks,
}
