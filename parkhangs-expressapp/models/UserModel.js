const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        firstName: {type: String, required: true}, // can't be changed
        lastName: {type: String, required: true}, // can't be changed
        username: {type: String, required: true}, //initially, first letter of first name + last name
        email: {type: String, required: true},  // can't be changed
        googleImageURL: {type: String, required: true},
        //accessToken: {type: String, required: true},  // // TODO: could be use for Google Calendar integration
        savedParks: {type: Array, required: true},
        savedEvents: {type: Array, required: true}
        // Vancouver Park API parkId, not the ObjectId from Mongoose. initially empty
    },
);

module.exports = mongoose.model('user', User);
