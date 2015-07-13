import alt from '../alt';
import SignupActions from '../actions/SignupActions';
import SignupSource from '../sources/SignupSource';

class SignupStore {
  constructor() {
    this.signup = {};
    this.facebook = null;
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateSignup: SignupActions.UPDATE_SIGNUP,
      handleSignupSuccess: SignupActions.SIGNUP_SUCCESS,
      handleSignupFailed: SignupActions.SIGNUP_FAILED,
      handleUpdateFacebook: SignupActions.UPDATE_FACEBOOK
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

  handleUpdateFacebook(facebook) {
    this.facebook = facebook;
  }
}

module.exports = alt.createStore(SignupStore, 'SignupStore');
