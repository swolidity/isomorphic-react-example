import { Router } from 'express';

const router = new Router();

// api/users
router.get('/', function(req, res) {
	res.send('Get Users');
});

module.exports = router;