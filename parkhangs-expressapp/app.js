var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const database = require('./database/index');

var app = express();
var cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use('/', indexRouter);
app.use('/api', indexRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//database:
database.on('error', console.error.bind(console, 'MongoDB connection error:'));

// this is used to populate the database with parks.
// Do not uncomment unless we need to add the parks to the database again!

// const populatePark = require("./scripts/populateParks");
// populatePark();


// this is used to populate the database with park facilities.
// Do not uncomment unless we need to add the park facilities to the database again!
// const populateFacilities = require('./scripts/populateFacilities')
// populateFacilities()


// this is used to populate the database with park special features.
// Do not uncomment unless we need to add the park special features to the database again!
// const populateParkSpecialFeatures = require('./scripts/populateSpecialFeatures')
// populateParkSpecialFeatures()

module.exports = app;
