import { Router } from 'express';
import Message from './models/message';
import MessageThread from './models/message_thread';
import authenticateToken from './middleware/authenticate-token';

const router = new Router();

// get: /api/chat/messages
router.get('/messages', (req, res, next) => {
  Message.find({_thread: req.query.threadId })
    .exec((err, messages) => {
      if (err) return next(err);

      res.send(messages);
    });
});

router.post('/messages', authenticateToken, (req, res, next) => {
  const user = req.user;
  const message = new Message({
    _user: user._id,
    _thread: req.body.threadId,
    text: req.body.text,
  });

  message.save((err) => {
    if (err) return next(err);

    res.send(message);
  });
});

router.post('/threads', authenticateToken, (req, res, next) => {
  const name = req.body.name;
  const thread = new MessageThread({
    name: name,
  });

  thread.save((err) => {
    if (err) return next(err);

    res.send(thread);
  });
});

module.exports = router;
