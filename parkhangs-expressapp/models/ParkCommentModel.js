const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkComment = new Schema(
    {
        parkId: {type: Number, required: true},
        parkCommentId: {type: Number, required: true},
        comment: {type: String, required: true},
        creatorId: {type: Number, required: true},
        creatorName: {type: String, required: true},
        createdDateTime: {type: String, required: true}
    },
);

module.exports = mongoose.model('parkComments', ParkComment);