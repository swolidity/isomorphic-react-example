import alt from '../alt';
import UsersActions from '../actions/UsersActions';
import UsersSource from '../sources/UsersSource';

class UsersStore {
	constructor() {
		this.users = [];
		this.errorMessage = null;

		this.bindListeners({
			handleUpdateUsers: UsersActions.UPDATE_USERS,
			handleFetchUsers: UsersActions.FETCH_USERS,
			handleUsersFailed: UsersActions.USERS_FAILED
		});

		this.exportAsync(UsersSource);
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

module.exports = alt.createStore(UsersStore, 'UsersStore');
