import { Router } from 'express';

const router = new Router();

router.use('/users', require('./users'));

module.exports = router;