import alt from '../alt';
import UserActions from '../actions/UserActions';

class UserStore {
	constructor() {
		this.users = [];
		this.errorMessage = null;

		this.bindListeners({
			handleUpdateUsers: UserActions.UPDATE_USERS,
			handleGetUsers: UserActions.GET_USERS,
			handleUsersFailed: UserActions.USERS_FAILED
		});
	}

	handleUpdateUsers(users) {
		this.users = users;
		this.errorMessage = null;
	}

	handleGetUsers() {
		this.users = [];
	}

	handleLocationsFailed(errorMessage) {
		this.errorMessage = errorMessage;
	}
}

module.exports = alt.createStore(UserStore, 'UserStore');