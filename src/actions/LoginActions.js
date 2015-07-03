import alt from '../alt';
import router from '../router';

class LoginActions {

  // update login credentials
  updateLogin(login) {
    this.dispatch(login);
  }

  // Login user with jwt token
  loginUser(token) {
    localStorage.setItem('token', token);

    router.transitionTo('/');

    this.dispatch(token);
  }

  loginFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  logoutUser() {
    localStorage.removeItem('token');
    router.transitionTo('/login');

    this.dispatch();
  }
}

module.exports = alt.createActions(LoginActions);
