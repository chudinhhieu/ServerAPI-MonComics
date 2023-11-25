var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Web
var homeRoute = require('./routes/home');
var genresRoute = require('./routes/genres');
var comicsRoute = require('./routes/comics');
var commentsRoute = require('./routes/comments');
var usersRoute = require('./routes/users');

// App
var apiUsersRoute = require('./apiRoutes/api.users');
var apiComicsRoute = require('./apiRoutes/api.comics');
var apiGenresRoute = require('./apiRoutes/api.genres');
var apiCommentsRoute = require('./apiRoutes/api.comments');
var apiFavoriteRoute = require('./apiRoutes/api.favorite');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Web
app.use('/', homeRoute);
app.use('/genres', genresRoute);
app.use('/comics', comicsRoute);
app.use('/comments', commentsRoute);
app.use('/users', usersRoute);

// App
app.use('/api/users', apiUsersRoute);
app.use('/api/comics', apiComicsRoute);
app.use('/api/genres', apiGenresRoute);
app.use('/api/comments', apiCommentsRoute);
app.use('/api/favorites', apiFavoriteRoute);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
