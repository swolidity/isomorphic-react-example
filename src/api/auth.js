import { Router } from 'express';
import User from './models/user';
import jwtUtil from './utils/jwt-util';

const router = new Router();

// post: api/auth/login
router.post('/login', (req, res, next) => {

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) { return next(err); }

    // No user found with that username
    if (!user) { return res.status(401).send('Authentication failed. User not found'); }

    // Make sure password is correct
    user.verifyPassword(req.body.password, (err, isMatch) => {
      if (err) { return next(err) }

      // Password did not match
      if (!isMatch) { return res.status(401).send('Authentication failed. Invalid password.'); }

      // user found and password is correct
      // create token
      let token = jwtUtil.createToken({ _id: user._id });

      // return user with token
      res.send({
        username: user.username,
        token: token
      });
    });
  });
});

module.exports = router;
