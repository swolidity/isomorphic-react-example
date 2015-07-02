import React from 'react';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import Authenticated from '../../decorators/Authenticated';

class Users extends React.Component {

	constructor() {
		super();
		this.state = UserStore.getState();

		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
		UserStore.fetchUsers();
	}

	componentDidMount() {
		UserStore.listen(this.onChange);
	}

	componentWillUnmount() {
		UserStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		if (this.state.errorMessage) {
			return (
				<div>Error: {this.state.errorMessage}</div>
				);
		}

		if(UserStore.isLoading()) {
			return (
				<div>
					<img src="/spinner.gif" />
				</div>
				)
		}

		return (
				<ul>
					{this.state.users.map((user) => {
						return (
								<li>{user.username}</li>
							);
					})}
				</ul>
			);
	}
}

module.exports = Authenticated(Users);
