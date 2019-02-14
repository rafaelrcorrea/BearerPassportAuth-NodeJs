const Config = require('../config.js');
const { ExtractJwt, Strategy } = require('passport-jwt');

module.exports = function(passport){
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = Config.jwtSecretKey;

  console.log(ExtractJwt.fromAuthHeaderAsBearerToken());

  passport.use('passport1',new Strategy(opts, async function(jwt_payload, done){
    // HERE YOU CAN VALIDATE YOUR TOKEN CONTENT WITH 'jwt_payload'
    return done(null, {
      data: jwt_payload,
      message: 'Passing through passport1',
    });
  }));

  passport.use('passport2', new Strategy(opts, async function(jwt_payload, done){
    // HERE YOU CAN VALIDATE YOUR TOKEN DATA CONTENT 'jwt_payload'
    return done(null, {
      data: jwt_payload,
      message: 'Passing through passport2',
    });
}));
}