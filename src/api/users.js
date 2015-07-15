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

// get : /api/users/:username
router.get('/:username', (req, res, next) => {
	User
		.findOne({username: req.params.username})
		.select('-password')
		.exec((err, user) => {
			if (err) return next(err);

			res.send(user);
		});
});

// post: /api/users/edit
router.post('/edit', authenticateToken, (req, res, next) => {
	res.send({ username: req.user.username });
});

module.exports = router;
