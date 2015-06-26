import React from 'react';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

let Users = React.createClass({

	getInitialState() {
		return UserStore.getState();
	},

	componentDidMount() {
		UserStore.listen(this.onChange);
		UserStore.fetchUsers();
	},

	componentWillUnmount() {
		UserStore.unlisten(this.onChange);
	},

	onChange(state) {
		this.setState(state);
	},

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
								<li>{user.name}</li>
							);
					})}
				</ul>
			);
	}
});

module.exports = Users;
