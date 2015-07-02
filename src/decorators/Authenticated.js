import React from 'react';
import LoginStore from '../stores/LoginStore';

function Authenticated(ComposedComponent) {
  return class Authenticated extends React.Component {

    static willTransitionTo(transition) {
      if (!LoginStore.isLoggedIn()) {
        transition.redirect('/login');
      }
    }

    constructor() {
      super()
      this.state = LoginStore.getState();
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      LoginStore.listen(this.handleChange);
    }

    componentWillUnmount() {
      LoginStore.unlisten(this.handleChange);
    }

    handleChange(state) {
      this.setState(state);
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          user={this.state.user}
        />
      );
    }
  }
}

module.exports = Authenticated;
