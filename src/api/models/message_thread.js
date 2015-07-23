import mongoose from 'mongoose';

const MessageThread = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    'default': Date.now,
  },

});

module.exports = mongoose.model('MessageThread', MessageThread);
