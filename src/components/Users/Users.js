import React from 'react';
import UsersStore from '../../stores/UsersStore';
import UserActions from '../../actions/UserActions';
import Authenticated from '../../decorators/Authenticated';

class Users extends React.Component {

	constructor() {
		super();
		this.state = UsersStore.getState();

		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
		UsersStore.fetchUsers();
	}

	componentDidMount() {
		UsersStore.listen(this.onChange);
	}

	componentWillUnmount() {
		UsersStore.unlisten(this.onChange);
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

		if(UsersStore.isLoading()) {
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
								<div>
									<img className="img-circle" src={ user.photo } alt={ user.username } />
									{ user.username }
								</div>
							);
					})}
				</ul>
			);
	}
}

module.exports = Authenticated(Users);
