import alt from '../alt';
import LoginActions from '../actions/LoginActions';
import LoginSource from '../sources/LoginSource';

class LoginStore {
  constructor() {
    this.user = null;
    this.login = {};
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateLogin: LoginActions.UPDATE_LOGIN,
      handleLoginUser: LoginActions.LOGIN_USER,
      handleLoginFailed: LoginActions.LOGIN_FAILED
    });

    this.exportAsync(LoginSource);

  }

  handleUpdateLogin(login) {
    this.login = login;
  }

  handleLoginUser(user) {
    this.user = user;
    this.errorMessage = null;
  }

  handleLoginFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  static isLoggedIn() {
    const state = this.getState();
    return !!state.user;
  }
}

module.exports = alt.createStore(LoginStore, 'LoginStore');
