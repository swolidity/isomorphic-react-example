import alt from '../alt';
import UserActions from '../actions/UserActions';
import UserSource from '../sources/UserSource';

class UserStore {
	constructor() {
		this.users = [];
		this.errorMessage = null;

		this.bindListeners({
			handleUpdateUsers: UserActions.UPDATE_USERS,
			handleFetchUsers: UserActions.FETCH_USERS,
			handleUsersFailed: UserActions.USERS_FAILED
		});

		this.exportAsync(UserSource);
	}

	handleUpdateUsers(users) {
		this.users = users;
		this.errorMessage = null;
	}

	handleFetchUsers() {
		this.users = [];
	}

	handleUsersFailed(errorMessage) {
		this.errorMessage = errorMessage;
	}
}

module.exports = alt.createStore(UserStore, 'UserStore');
