import LoginActions from '../actions/LoginActions';
import http from 'axios';

const LoginSource = {
  login: {
    remote(state) {
      return http.post('/api/login', {
        username: state.login.username,
        password: state.login.password
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

module.exports = LoginSource;
