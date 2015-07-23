import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  facebook: {
    id: String,
    token: String
  },
  date: {
    type: Date,
    'default':
    Date.now
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

UserSchema.pre('save', function(cb) {
  let user = this;

  if (!user.isModified('password')) return cb();

  bcrypt.genSalt(5, (err, salt) => {
    if (err) return cb(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return cb(err);
      user.password = hash;
      cb();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  })
}

module.exports = mongoose.model('User', UserSchema);
