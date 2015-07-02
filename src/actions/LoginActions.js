import alt from '../alt';
import router from '../router';

class LoginActions {

  // update login credentials
  updateLogin(login) {
    this.dispatch(login);
  }

  // Login user. user object contains jwt token
  loginUser(user) {
    localStorage.setItem('token', user.token);
    router.transitionTo('/');
    
    this.dispatch(user);
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
