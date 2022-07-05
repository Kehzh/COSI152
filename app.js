var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const layouts = require("express-ejs-layouts");
const axios = require('axios');
const session = require("express-session"); 
const mongoose = require( 'mongoose' );
const MongoDBStore = require('connect-mongodb-session')(session);


// *********************************************************** //
//  Loading routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const auth = require('./routes/auth');
const missingdogs = require('./routes/missingdogs');
const dogpedia = require('./routes/dogpedia');
// *********************************************************** //
// *********************************************************** //
//  Loading database
const mongodb_URI = 'mongodb+srv://admin:A1d3m13i9@bzhang.qeg2v.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect( mongodb_URI, { useNewUrlParser: true, useUnifiedTopology: true } );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we are connected!!!")});
var store = new MongoDBStore({
  uri: mongodb_URI,
  collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});
// *********************************************************** //

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(layouts);
// app.use(auth);
app.use(missingdogs);
app.use(dogpedia);
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
