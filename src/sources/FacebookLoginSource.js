import LoginActions from '../actions/LoginActions';
import http from 'axios';

const FacebookLoginSource = {
  fb_login: {
    remote(state, facebook_id) {
      return http.post('/api/login/fb', {
        facebook_id: facebook_id
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err.data);
      });
    },

    local() {
      return null;
    },

    success: LoginActions.loginUser,
    error: LoginActions.loginFailed
  }
}

module.exports = FacebookLoginSource;
