import { Router } from 'express';

const router = new Router();

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/users', require('./users'));
router.use('/chat', require('./chat'));

module.exports = router;
