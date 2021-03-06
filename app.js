var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var playerRouter = require('./routes/player');
var screenRouter = require('./routes/screens');
var siteRouter = require('./routes/sites');
var cookieRouter = require('./routes/cookie');
var jsrouteRouter = require('./routes/jsroute');

var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.locals.basedir = path.join(__dirname, 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', apiRouter);
app.use('/player', playerRouter);
app.use('/screen', screenRouter);
app.use('/site', siteRouter);
app.use('/cookie', cookieRouter);
app.use('/js', jsrouteRouter)

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
