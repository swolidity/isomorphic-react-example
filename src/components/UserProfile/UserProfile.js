import React from 'react';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

class UserProfile extends React.Component {

  static willTransitionTo(transition) {
    // TODO: redirect if user not found
  }

  constructor(props) {
    super(props);

    this.state = UserStore.getState();
  }

  componentDidMount() {
    UserStore.listen(this.handleChange);
    UserStore.fetchUser(this.props.params.username);
  }

  componentWillUnmount() {
    UserStore.unlisten(this.handleChange);
  }

  handleChange = (state) => {
    this.setState(state);
  }

  render() {
    if (this.state.err) {
			return (
				<div className="container">Error: {this.state.err}</div>
				);
		}

		if(UserStore.isLoading()) {
			return (
				<div className="container">
					<img src="/spinner.gif" />
				</div>
      );
		}

    if(!this.state.user) {
      return (
        <div className="container">User not found</div>
      );
    }

    return (
      <div className="UserProfileHeader">
        <div className="container">
          <img src={this.state.user.photo} alt={this.state.user.username} />
        </div>
      </div>
    );
  }
}

module.exports = UserProfile;
