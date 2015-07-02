import { Router } from 'express';
import User from './models/user';
import authenticateToken from './middleware/authenticate-token';

const router = new Router();

// get: /api/users
router.get('/', (req, res) => {
	User.find((err, users) => {
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
      res.send(err);
    }

    res.send({ success: true });
  });
});

// post: /api/users/edit
router.post('/edit', authenticateToken, (req, res, next) => {
	res.send({ username: req.user.username });
});

module.exports = router;
