var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var person = require('./routes/person');

var app = express();
var http = require('http');
var debug = require('debug')('secret-santa-selector:server');

// view engine setup
// pug page to support route error handling
app.set('view engine', 'pug');
// angular engine
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/api/v1/person', person);

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

// server startup
var port = 8000;
var server = http.createServer(app);

server.listen(port);

// module.exports = app;
