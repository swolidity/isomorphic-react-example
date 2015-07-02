import alt from '../alt';

class LoginActions {

  // update login credentials
  updateLogin(login) {
    this.dispatch(login);
  }

  // Login user. user object contains jwt token
  loginUser(user) {
    localStorage.setItem('token', user.token);
    this.dispatch(user);
  }

  loginFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

module.exports = alt.createActions(LoginActions);
