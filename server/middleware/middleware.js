const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

const app = express();

const passport = require('../auth/passport');

// app.use('/', express.static('client'));

// For /auth and /user routes, user body parser
app.use(/\/(auth|user)/, bodyParser.urlencoded({ extended: true }));
app.use(/\/(auth|user)/, bodyParser.json());

app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { maxAge: 605000000 } }));

// Initialize and create passport session for all routes
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
