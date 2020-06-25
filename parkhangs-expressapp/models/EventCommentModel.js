const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventComment = new Schema(
    {
        eventId: {type: Number, required: true},
        eventCommentId: {type: Number, required: true},
        comment: {type: String, required: true},
        creatorId: {type: Number, required: true},
        creatorName: {type: String, required: true},
        createdDateTime: {type: Date, required: true}
    },
);

module.exports = mongoose.model('eventComments', EventComment);