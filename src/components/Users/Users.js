import React from 'react';
import UserStore from '../stores/UserStore';

let Users = React.createClass({

	getInitialState() {
		return UserStore.getState();
	},

	componentDidMount() {
		UserStore.listen(this.onChange);

		UserActions.getUsers();
	},

	componentWillUnmount() {
		LocationStore.unlisten(this.onChange);
	},

	onChange(state) {
		this.setState(state);
	},

	render() {
		if (this.state.errorMessage) {
			return (
				<div>There was an error</div>
				);
		}

		if(!this.state.users.length) {
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
								<li>{user.name}</li>
							);
					})}
				</ul>
			);
	}
});

module.exports = Users;