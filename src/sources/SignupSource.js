import SignupActions from '../actions/SignupActions';
import http from 'axios';

const SignupSource = {
  signup: {
    remote(state) {
      return http.post('/api/signup', {
        username: state.signup.username,
        email: state.signup.email,
        password: state.signup.password,
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

module.exports = SignupSource;
