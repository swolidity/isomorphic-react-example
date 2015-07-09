import { Router } from 'express';
import User from './models/user';
import authenticateToken from './middleware/authenticate-token';
import jwt_utils from './utils/jwt-util';

const router = new Router();

// get: /api/users
router.get('/', (req, res) => {
	User.find({}).sort({date: 'desc'}).exec((err, users) => {
		res.send(users);
	});
});

// post: /api/users
router.post('/', (req, res) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save((err) => {
    if (err) {
			console.log(err);
      return res.status(500).send(err);
    }

		let token = jwt_utils.createToken({
			_id: user._id,
			username: user.username
		});

		// return jwt token
    res.send(token);
  });
});

// post: /api/users/edit
router.post('/edit', authenticateToken, (req, res, next) => {
	res.send({ username: req.user.username });
});

module.exports = router;
