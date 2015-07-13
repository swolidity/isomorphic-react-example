import React from 'react';
import { Input, ButtonInput } from 'react-bootstrap';

require('./FacebookSignup.scss');

class FacebookSignup extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault;

    let signup = {
      username: this.refs.username.getValue(),
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    };

    this.props.signupHandler(signup);

  }

  render() {
    return (
      <div className="FacebookSignup">
        <div className="header center">
          <div>
            <img className="profile-pic img-circle" src={ "https://graph.facebook.com/" + this.props.facebook.id + "/picture?width=100&height=100" } />
          </div>
          <div className="fb-welcome">
            <h5>Hey { this.props.facebook.first_name }!</h5>
            We just need a little more info to complete your sign up.
          </div>
        </div>
        <form>
          <Input type="text" placeholder="username" ref="username" />
          <Input type="email" placeholder="email" ref="email" defaultValue={ this.props.facebook.email } />
          <Input type="password" placeholder="password" ref="password" />
          <ButtonInput className="btn-block" type="submit" value="Sign Up" onClick={ this.handleSubmit } />
        </form>
    </div>
    );
  }
}

module.exports = FacebookSignup;
