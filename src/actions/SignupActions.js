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

  updateFacebook(facebook) {
    this.dispatch(facebook);
  }
}

module.exports = alt.createActions(SignupActions);
