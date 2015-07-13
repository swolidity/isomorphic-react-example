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

  let facebook = req.body.facebook;

  if(facebook) {
    user.facebook.id = facebook.id;
    user.facebook.token = facebook.token;
  }

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
