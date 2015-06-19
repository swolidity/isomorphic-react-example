import alt from '../alt';
import http from 'superagent';

class UserActions {

	updateUsers(users) {
		this.dispatch(users);
	}

	getUsers() {
		this.dispatch();

		http.get('/api/users')
			.accept('application/json')
			.end((err, res) => {
				if(err) {
					this.usersFailed(errorMessage);
				}
				this.actions.updateUsers(res);
			});
	}

	usersFailed(errorMessage) {
		this.dispatch(errorMessage);
	}
}

module.exports = alt.createActions(UserActions);