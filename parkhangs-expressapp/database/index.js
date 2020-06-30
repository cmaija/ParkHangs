const mongoose = require('mongoose');
//import this statement to get the .env file
require('dotenv').config();

//this is how you get the value from the env file
let PASSWORD = process.env.DB_PASSWORD;

let DBNAME = "ParkHangs";

let MONGODBCONNECTIONURL = `mongodb+srv://park_hangs_team:${PASSWORD}@parkhangs-ngrhm.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;

mongoose
    .connect(MONGODBCONNECTIONURL, {useNewUrlParser: true})
    .catch(e => {
        console.error('Connection error', e.message)
    });

const database = mongoose.connection;

module.exports = database;
