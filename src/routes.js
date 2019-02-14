const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const routes = express.Router();
const Config = require('./config.js');
require('./middleware/passport')(passport);

const passport1 = session => { return passport.authenticate('passport1', {session}) };
const passport2 = session => { return passport.authenticate('passport2', {session}) };

routes.get('/', (req, res) => {
  res.send('HELLO LITTLE WORLD');
});

// PROTECTED
routes.get('/passport1', passport1(false), (req, res) => {
  res.send(req.user);
});

// PROTECTED
routes.get('/passport2', passport2(false), (req, res) => {
  res.send(req.user);
});

// NOT PROTECTED
routes.get('/unprotected', (req, res) => {
  res.send(req.user);
});

routes.get('/token', (req, res) => {
  const user = {
   id: 1,
   username: 'some_user_name',
   email: 'some_user_email@email.com' ,
  }

  jwt.sign({user}, Config.jwtSecretKey, (err, token) => {
    res.json({token});
  });
});

module.exports = routes;