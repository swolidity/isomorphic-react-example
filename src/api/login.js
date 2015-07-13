import { Router } from 'express';
import User from './models/user';
import jwt_util from './utils/jwt-util';

const router = new Router();

// post: api/login
router.post('/', (req, res, next) => {

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return next(err);

    // No user found with that username
    if (!user) return res.status(401).send('Authentication failed. User not found');

    // Make sure password is correct
    user.verifyPassword(req.body.password, (err, isMatch) => {
      if (err) { return next(err) }

      // Password did not match
      if (!isMatch) return res.status(401).send('Authentication failed. Invalid password.');

      // user found and password is correct
      // create token
      let token = jwt_util.createToken({
        _id: user._id,
        username: user.username
        });

      // return user with token
      res.send(token);
    });
  });
});

// post: /api/login/fb
router.post('/fb', (req, res, next) => {

  User.findOne({ 'facebook.id': req.body.facebook_id }, (err, user) => {
    if (err) return next(err);

    if(!user) return res.status(401).send('Authentication failed. User not found');

    // user found and password is correct
    // create token
    let token = jwt_util.createToken({
      _id: user._id,
      username: user.username
      });

    // return user with token
    res.send(token);

  });

});

module.exports = router;
