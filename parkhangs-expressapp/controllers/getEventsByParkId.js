const Park = require('../models/ParkModel');
const Event = require('../models/EventModel');

const express = require('express');
const Request = require("request");

const getEventsByParkId = async (req, res) =>{

    //verify there's a valid park in the db park
    await Park.find( {parkId: req.params.parkId}, (err, parks) => {
        if(err) {
                return res.status(400).json({sucess:false, error: err})
            }
        if (!parks.length){
                return res
                            .status(404)
                            .json({success: false, error: `Park by this ID not found!`})
        }
    })


   //at this point a park is found by id! Finds events with that park Id
   await Event.find({parkId: req.params.parkId}, (err, events) => {
        if(err) {
            return res.status(400).json({sucess:false, error: err})
        }
        if (!events.length) {
            return res
                .status(404)
                .json({success:false, error: `No Events by this Id!`})
        }
        return res.status(200).json({sucess: true, data: events})
   })};

module.exports = {
    getEventsByParkId
}