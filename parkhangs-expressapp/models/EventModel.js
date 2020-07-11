const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema(
    {
        parkId: {type: String, required: true},
        details: {type: String, required: true},
        eventDateTime: {type: String, required: true},
        createdDateTime: {type: String, required: true},
        creatorName: {type: String, required: true},
        creatorId: {type: Number, required: false}
    },
);

module.exports = mongoose.model('events', Event);
