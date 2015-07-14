import React from 'react';

class UserProfile extends React.Component {

  static willTransitionTo(transition) {
    // TODO: redirect if user not found
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ProfileHeader">
        <div className="container">

          <p>Username: {this.props.params.username}</p>
        </div>
      </div>

    );
  }
}

module.exports = UserProfile;
