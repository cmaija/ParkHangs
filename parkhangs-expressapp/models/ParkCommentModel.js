const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkComment = new Schema(
    {
        parkId: {type: String, required: true},
        parkCommentId: {type: String, required: true},
        comment: {type: String, required: true},
        creatorId: {type: Number, required: true},
        creatorName: {type: String, required: true},
        createdDateTime: {type: String, required: true}
    },
    {
      collection : 'parkComments'
    }
);

module.exports = mongoose.model('parkComments', ParkComment);
