var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
console.log("gg");
// New Code
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var db = require('mongodb').MongoClient;
console.log(db.name);
var index = require('./routes/index');
var index1 = require('./routes/index1');
var users = require('./routes/users');
var routes = require('./routes/');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/index1', index1);
app.use('/users', users);




// Connect to the db
MongoClient.connect("mongodb://localhost:27017/nodetest1", function(err, db) {
  if(err) { return console.log(err); }

  var collection = db.collection('test2');
  var docs = [{mykey:1}, {mykey:2}, {mykey:3}];

  collection.insert(docs, {w:1}, function(err, result) {

   // collection.remove({mykey:1});

   // collection.remove({mykey:2}, {w:1}, function(err, result) {});

    //collection.remove();
  });
});


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
