import { Router } from 'express';

const router = new Router();

// api/users
router.get('/', function(req, res) {
	let users = [
		{ id: 1, name: 'Andy Kay' },
		{ id: 2, name: 'Jerry Seinfeld' },
		{ id: 3, name: 'George Costanza' },
		{ id: 4, name: 'Elaine Benes' },
		{ id: 5, name: 'Cosmo Kramer' },
	];
	res.send(users);
});

module.exports = router;
