import { Router } from 'express';
import User from './models/user';
import jwt_util from './utils/jwt-util';

const router = new Router();

// post: api/login
router.post('/', (req, res, next) => {

  User
    .findOne({ username: req.body.username })
    .exec((err, user) => {
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
        user = user.toObject(); // convert from instance of Mongoose Model to POJO ( Plain Old Javascript Object )
        delete user.password; // remove hashed password from user object before creating the token
        let token = jwt_util.createToken(user);

        // return user with token
        res.send(token);
      });
    });
});

// post: /api/login/fb
router.post('/fb', (req, res, next) => {

  User
    .findOne({ 'facebook.id': req.body.facebook_id })
    .select('-password')
    .exec((err, user) => {
      if (err) return next(err);

      if(!user) return res.status(401).send('Authentication failed. User not found');

      // user found and password is correct
      // create token
      let token = jwt_util.createToken(user);

      // return user with token
      res.send(token);

    });

});

module.exports = router;
