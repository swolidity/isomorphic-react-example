import alt from '../alt';

class UserActions {

	updateUsers(users) {
		this.dispatch(users);
	}

	fetchUsers() {
		this.dispatch(); // "loading" state
	}

	usersFailed(errorMessage) {
		this.dispatch(errorMessage);
	}
}

module.exports = alt.createActions(UserActions);
