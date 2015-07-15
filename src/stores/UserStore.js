import alt from '../alt';
import UserActions from '../actions/UserActions';
import UserSource from '../sources/UserSource';

class UserStore {
  constructor() {
    this.user = null;
    this.err = null;

    this.bindListeners({
      handleUpdateUser: UserActions.UPDATE_USER,
      handleFetchUser: UserActions.FETCH_USER,
      handleUserFailed: UserActions.USER_FAILED
    });

    this.exportAsync(UserSource);

  }

  handleUpdateUser(user) {
    this.user = user;
  }

  handleFetchUser() {
    this.user = null;
  }

  handleUserFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createStore(UserStore, 'UserStore');
