import React from 'react';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

class Users extends React.Component {

	constructor(props) {
		super(props);
		this.state = UserStore.getState();

		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		UserStore.listen(this._onChange);
		UserStore.fetchUsers();
	}

	componentWillUnmount() {
		UserStore.unlisten(this._onChange);
	}

	_onChange(state) {
		this.setState(state);
	}

	render() {
		if (this.state.errorMessage) {
			return (
				<div>Error: {this.state.errorMessage}</div>
				);
		}

		if(!this.state.users.length) {
			return (
				<div>
					{this.state.users}
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

module.exports = Users;
