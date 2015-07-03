import alt from '../alt';
import RouterContainer from '../RouterContainer';

class LoginActions {

  // update login credentials
  updateLogin(login) {
    this.dispatch(login);
  }

  // Login user with jwt token
  loginUser(token) {
    localStorage.setItem('token', token);

    RouterContainer.get().transitionTo('/');

    this.dispatch(token);
  }

  loginFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  logoutUser() {
    localStorage.removeItem('token');
    RouterContainer.get().transitionTo('/login');

    this.dispatch();
  }
}

module.exports = alt.createActions(LoginActions);
