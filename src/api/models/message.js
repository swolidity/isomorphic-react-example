import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({

  _user: {
    type: String,
    ref: 'User',
    required: true,
  },

  _thread: {
    type: String,
    ref: 'MessageThread',
    required: true
  },

  text: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    'default': Date.now,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
