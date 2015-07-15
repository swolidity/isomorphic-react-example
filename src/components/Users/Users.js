import React from 'react';
import UsersStore from '../../stores/UsersStore';
import UsersActions from '../../actions/UsersActions';

class Users extends React.Component {

	constructor() {
		super();
		this.state = UsersStore.getState();

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		UsersStore.listen(this.onChange);
		UsersStore.fetchUsers();
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
				<div className="container">Error: {this.state.errorMessage}</div>
				);
		}

		if(UsersStore.isLoading()) {
			return (
				<div className="container">
					<img src="/spinner.gif" />
				</div>
				)
		}

		return (
			<div className="container">
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
			</div>
			);
	}
}

module.exports = Users;
