const User = require('../models/UserModel');

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

    await User.findOne({_id: req.params.userId}, (err, user) => {

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
            user.savedParks = body.savedParks;
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

module.exports = {
    addUser,
    getUser,
    updateUser
};