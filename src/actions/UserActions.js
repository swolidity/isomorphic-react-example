import alt from '../alt';

class UserActions {

	updateUsers(users) {
		this.dispatch(users.data);
	}

	fetchUsers() {
		this.dispatch(); // "loading" state
	}

	usersFailed(errorMessage) {
		this.dispatch(errorMessage);
	}
}

module.exports = alt.createActions(UserActions);
