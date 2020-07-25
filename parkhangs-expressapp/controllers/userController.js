const User = require('../models/UserModel');
const Park = require('../models/ParkModel')
const Event = require('../models/EventModel')
const lodash = require('lodash')

const express = require('express');
const Request = require("request");

const getUser = async (req, res) => {

    await User.findOne({email: req.params.email}, (err, user) => {

        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!user) {
            // user doesn't exist
            return res.status(200).json({success: true, data: null})
        }

        return res.status(200).json({success: true, data: user})


    }).catch((err) => {
        return res.status(400).json({success: false, error: err})
    })

};

const addUser = async (req, res) => {

    const body = req.body;
    const errorString = 'You did not provide a user';

    if (!body) {
        return res.status(400).json({
            success: false,
            error: errorString
        })
    }

    let newUser = new User(body);

    if (!newUser) {
        return res.status(400).json({success: false, error: errorString})
    }

    newUser
        .save()
        .then((addedUser) => {
            return res.status(201).json({
                success: true,
                newUser: addedUser,
            })
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: 'User not added!',
            })
        })
};


const updateUser = async (req, res) => {

    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    await User.findOne({_id: req.params.userId}, async (err, user)  => {

        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }

        //only able to update username and savedparks

        if (body.username !== undefined) {
            user.username = body.username;
        }

        if (body.savedParks !== undefined) {
            try {
                await saveParks(user.savedParks, body.savedParks)
            } catch (error) {
                console.error(error.message)
                console.log("unable to update park favourite count")
                return res.status(404).json({
                    error,
                    message: `unable to update park with id:${body.savedparks} favourite count`
                })
            }

            user.savedParks = body.savedParks
        }

        if (body.savedEvents !== undefined) {
            try {
                await saveEvents(user.savedEvents, body.savedEvents)
            } catch (error) {
                console.error(error)
                console.log('unable to update event favorite count')
                return res.status(404).json({
                    error,
                    message: `unable to update event with id:${body.savedEvents} favourite count`
                })
            }
        }

        user.save()
            .then((updatedUser) => {
                return res.status(200).json({
                    success: true,
                    updatedUser: updatedUser,
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User was not updated!',
                })
            })
    })

};

async function saveParks (savedParks, newSavedParks) {
    const parksToUnFavorite = []
    const parksToFavorite = []

    for (park of savedParks) {
        if (!newSavedParks.includes(park)) {
            parksToUnFavorite.push(park)
        }
    }

    for (park of newSavedParks) {
        if (!savedParks.includes(park)) {
            parksToFavorite.push(park)
        }
    }

    for (park of parksToFavorite) {
        const likedPark = await Park.findOne({_id: park})
        if (!likedPark.favoritesCount || likedPark.favoritesCount === 0) {
            likedPark.favoritesCount = 0
        }
        likedPark.favoritesCount += 1
        await likedPark.save()
    }

    for (park of parksToUnFavorite) {
        const likedPark = await Park.findOne({_id: park})
        if (!!likedPark.favoritesCount && likedPark.favoritesCount !== 0) {
            likedPark.favoritesCount -= 1
        }

        await likedPark.save()
    }

    return
}

async function saveEvents (savedEvents, newSavedEvents) {
    const eventsToFavorite = []
    const eventsToUnFavorite = []

    for (event of savedEvents) {
        if (!newSavedEvents.includes(event)) {
            eventsToUnFavorite.push(event)
        }
    }

    for (event of newSavedEvents) {
        if (!savedEvents.includes(event)) {
            eventsToFavorite.push(event)
        }
    }

    for (event of eventsToFavorite) {
        const favoritedEvent = await Event.findOne({_id: event})
        if (!favoritedEvent.favoritesCount || likedPark.favoritesCount === 0) {
            favoritedEvent.favoritesCount = 0
        }
        favoritedEvent.favoritesCount += 1
        await favoritedEvent.save()
    }

    for (event of eventsToUnFavorite) {
        const unfavoritedEvent = await Event.findOne({_id: event})
        if (!!unfavoritedEvent.favoritesCount && unfavoritedEvent.favoritesCount !== 0) {
            unfavoritedEvent.favoritesCount -= 1
        }

        await unfavoritedEvent.save()
    }

    return
}

module.exports = {
    addUser,
    getUser,
    updateUser
};
