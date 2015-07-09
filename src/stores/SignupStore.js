import alt from '../alt';
import SignupActions from '../actions/SignupActions';
import SignupSource from '../sources/SignupSource';
import LoginActions from '../actions/LoginActions';

class SignupStore {
  constructor() {
    this.signup = {};
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateSignup: SignupActions.UPDATE_SIGNUP,
      handleSignupSuccess: SignupActions.SIGNUP_SUCCESS,
      handleSignupFailed: SignupActions.SIGNUP_FAILED
    });

    this.exportAsync(SignupSource);
  }

  handleUpdateSignup(signup) {
    this.signup = signup;
  }

  handleSignupSuccess() {
    this.signup = {};
  }

  handleSignupFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(SignupStore, 'SignupStore');
