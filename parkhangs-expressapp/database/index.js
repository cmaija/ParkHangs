const mongoose = require('mongoose');

let DBNAME = "ParkHangs";
let PASSWORD = "PUT DB PASSWORD HERE";

let MONGODBCONNECTIONURL = `mongodb+srv://park_hangs_team:${PASSWORD}@parkhangs-ngrhm.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;

mongoose
    .connect(MONGODBCONNECTIONURL, {useNewUrlParser: true})
    .catch(e => {
        console.error('Connection error', e.message)
    });

const database = mongoose.connection;

module.exports = database;