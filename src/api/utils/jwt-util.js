import jwt from 'jsonwebtoken';

let jwt_util = {
  createToken(payload) {
    // TODO: make sure you change 'secret' to something secure and 'secret' :)
    return jwt.sign(payload, 'secret', {
      expiresInMinutes: 1440
    });
  }
}

module.exports = jwt_util;
