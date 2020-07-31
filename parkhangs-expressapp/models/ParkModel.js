const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Park = new Schema(
    {
        parkId: {type: Number, required: true},
        name: {type: String, required: true},
        neighbourhoodName: {type: String, required: true},
        neighbourhoodURL: {type: String, required: true},
        streetNumber: {type: Number, required: true},
        streetName: {type: String, required: true},
        hectares: {type: Number, required: true},
        hasWashrooms: {type: Boolean, required: true},
        hasFacilities: {type: Boolean, required: true},
        hasAdvisories: {type: Boolean, required: true},
        hasSpecialFeatures: {type: Boolean, required: true},
        googleMapsLatLon: {type: Array, required: true},
        ratings: {type: Array, required: true},
        favoritesCount: {type: Number, required: true}
    },
);

module.exports = mongoose.model('parks', Park);
