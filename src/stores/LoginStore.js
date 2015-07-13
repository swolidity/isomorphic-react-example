import alt from '../alt';
import LoginActions from '../actions/LoginActions';
import LoginSource from '../sources/LoginSource';
import FacebookLoginSource from '../sources/FacebookLoginSource';
import jwt_decode from 'jwt-decode';

class LoginStore {
  constructor() {
    this.user = null;
    this.login = {};
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateLogin: LoginActions.UPDATE_LOGIN,
      handleLoginUser: LoginActions.LOGIN_USER,
      handleLoginFailed: LoginActions.LOGIN_FAILED,
      handleLogoutUser: LoginActions.LOGOUT_USER
    });

    this.exportAsync(LoginSource);
    this.exportAsync(FacebookLoginSource);

  }

  handleUpdateLogin(login) {
    this.login = login;
  }

  handleLoginUser(token) {
    this.user = jwt_decode(token);
    this.errorMessage = null;
  }

  handleLoginFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleLogoutUser() {
    this.user = null;
  }

  static isLoggedIn() {
    const state = this.getState();
    return !!state.user;
  }
}

module.exports = alt.createStore(LoginStore, 'LoginStore');
