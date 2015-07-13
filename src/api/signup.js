import { Router } from 'express';
import User from './models/user';
import jwt_util from './utils/jwt-util';

const router = new Router();

// post: /api/signup
router.post('/', (req, res) => {
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  user.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }

		let token = jwt_util.createToken({
			_id: user._id,
			username: user.username
		});

		// return jwt token
    res.send(token);
  });
});

// post: /api/signup/fb
router.post('/fb', (req, res, next) => {

  let signup = req.body.signup;
  let facebook = req.body.facebook;

  if (!facebook) return res.status(401).send('Not a valid facebook acount')

  let user = new User({
    username: signup.username,
    email: signup.email,
    password: signup.password,
    photo: 'https://graph.facebook.com/' + facebook.id + '/picture?width=100&height=100',
    'facebook.id': facebook.id,
    'facebook.token': facebook.accessToken,
  });

  user.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }

		let token = jwt_util.createToken({
			_id: user._id,
			username: user.username
		});

		// return jwt token
    res.send(token);
  });

});

module.exports = router;
