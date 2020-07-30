const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ParkFacility = new Schema(
    {
        parkId: {
            type: Number,
            required: true
        },
        facilityUrl: {
            type: String,
            required: false,
        },
        facilityType: {
            type: String,
            required: true,
        },
        facilityCount: {
            type: Number,
            required: true,
        },
    },
)

module.exports = mongoose.model('park-facility', ParkFacility)
