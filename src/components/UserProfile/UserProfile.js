import React from 'react';

class UserProfile extends React.Component {

  static willTransitionTo(transition) {
    // TODO: redirect if user not found
  }

  constructor() {
    super();
  }

  render() {
    return (
      <p>Username: {this.props.params.username}</p>
    );
  }
}

module.exports = UserProfile;
