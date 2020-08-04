const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkSpecialFeature = new Schema(
    {
        name: {type: String, required: true},
    },
)

module.exports = mongoose.model('parkSpecialFeature', ParkSpecialFeature)
