import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class SignupActions {

  updateSignup(signup) {
    this.dispatch(signup);
  }

  signupSuccess(token) {
    LoginActions.loginUser(token);
    this.dispatch();
  }

  signupFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

module.exports = alt.createActions(SignupActions);
