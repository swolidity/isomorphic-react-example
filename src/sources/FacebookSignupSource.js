import SignupActions from '../actions/SignupActions';
import http from 'axios';

const FacebookSignupSource = {
  fb_signup: {
    remote(state) {
      return http.post('/api/signup/fb', {
        signup: state.facebook.signup,
        facebook: state.facebook,
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

    success: SignupActions.signupSuccess,
    error: SignupActions.signupFailed
  }
}

module.exports = FacebookSignupSource;
