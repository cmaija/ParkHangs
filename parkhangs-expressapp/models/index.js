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
        rating: {type: Number, required: true},
        hasWashrooms: {type: Boolean, required: true},
        hasFacilities: {type: Boolean, required: true},
        hasAdvisories: {type: Boolean, required: true},
        hasSpecialFeatures: {type: Boolean, required: true},
        googleMapsLatLon: {type: Array, required: true}
    },
);

module.exports = mongoose.model('parks', Park);

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


//TODO: to be used later!

//
// // export default mongoose.model('messages', Message);
// module.exports = mongoose.model('events', Event);
//
// const ParkComment = new Schema(
//     {
//         parkId: {type: Number, required: true},
//         parkCommentId: {type: Number, required: true},
//         comment: {type: String, required: true},
//         creatorId: {type: Number, required: true},
//         creatorName: {type: String, required: true},
//         createdDateTime: {type: String, required: true}
//     },
// );
//
// // export default mongoose.model('messages', Message);
// module.exports = mongoose.model('parkComments', ParkComment);
//
// const EventComment = new Schema(
//     {
//         eventId: {type: Number, required: true},
//         eventCommentId: {type: Number, required: true},
//         comment: {type: String, required: true},
//         creatorId: {type: Number, required: true},
//         creatorName: {type: String, required: true},
//         createdDateTime: {type: Date, required: true}
//     },
// );
//
// // export default mongoose.model('messages', Message);
// module.exports = mongoose.model('eventComments', EventComment);


