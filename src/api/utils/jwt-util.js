import jwt from 'jsonwebtoken';

let jwtUtil = {
  createToken(payload) {
    return jwt.sign(payload, 'secret', {
      expiresInMinutes: 1440
    });
  }
}

module.exports = jwtUtil;
