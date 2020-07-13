const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema(
    {
        parkId: {type: String, required: true},
        details: {type: String, required: true},
        eventDateTime: {type: String, required: true}, //when it starts
        eventEndDateTime: {type: String, required: false}, //when it ends/ not required
        createdDateTime: {type: String, required: true}, // when you made this event
        creatorName: {type: String, required: true},
        creatorId: {type: Number, required: false}
    },
);

module.exports = mongoose.model('events', Event);
