const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventComment = new Schema(
    {
        eventId: {type: String, required: true},
        eventCommentId: {type: String, required: true},
        comment: {type: String, required: true},
        creatorId: {type: Number, required: true},
        creatorName: {type: String, required: true},
        createdDateTime: {type: String, required: true}
    },
    {
      collection : 'eventComments'
    }
);

module.exports = mongoose.model('eventComments', EventComment);
