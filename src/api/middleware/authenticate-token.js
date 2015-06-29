import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/user';

let opts = {};
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, (jwt_payload, cb) => {
  User.findOne({'_id': jwt_payload._id}, (err, user) => {
    if (err) {
      return cb(err, false);
    }
    if (user) {
      cb(null, user);
    } else {
      cb(null, false);
    }
  });
}));

module.exports = passport.authenticate('jwt', { session: false});
