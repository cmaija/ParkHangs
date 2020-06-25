const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema(
    {
        parkId: {type: Number, required: true},
        eventId: {type: Number, required: true},
        details: {type: String, required: true},
        eventDateTime: {type: String, required: true},
        createdDateTime: {type: String, required: true},
        creatorName: {type: String, required: true},
        creatorId: {type: Number, required: true}
    },
);

module.exports = mongoose.model('events', Event);