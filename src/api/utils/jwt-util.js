import jwt from 'jsonwebtoken';

let jwt_util = {
  createToken(payload) {
    return jwt.sign(payload, 'secret', {
      expiresInMinutes: 1440
    });
  }
}

module.exports = jwt_util;
