import React from 'react';
import SignupActions from '../../actions/SignupActions';
import SignupStore from '../../stores/SignupStore';
import { Input, ButtonInput } from 'react-bootstrap';
import FacebookLogin from '../FacebookLogin/FacebookLogin';
import FacebookSignup from '../FacebookSignup/FacebookSignup';
require('./Signup.scss');

class Signup extends React.Component {

  constructor() {
    super();
    this.state = SignupStore.getState();
  }

  componentDidMount() {
    SignupStore.listen(this.handleChange);
  }

  componentWillUnmount() {
    SignupStore.unlisten(this.handleChange);
  }

  handleChange = (state) => {
    this.setState(state);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let signup = {
      username: this.refs.username.getValue(),
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    };

    SignupActions.updateSignup(signup);

    SignupStore.signup();
  }

  handleFacebookLogin = (facebook) => {
    SignupActions.updateFacebook(facebook);
  }

  handleFacebookSignup = (signup) => {
    let facebook = this.state.facebook;
    facebook.signup = signup;
    SignupActions.updateFacebook(facebook);
    SignupStore.fb_signup();
  }

  render() {

    if (this.state.facebook) {
      return (
        <div className="Signup col-xs-12 col-md-5 center-block">
          <FacebookSignup facebook={ this.state.facebook } signupHandler={ this.handleFacebookSignup } />
        </div>
      );
    }

    return (
      <div className="Signup col-xs-12 col-md-5 center-block">
        <p>{this.state.errorMessage}</p>

        <form>
          <Input type="text" placeholder="username" ref="username" defaultValue={this.state.signup.username} />
          <Input type="email" placeholder="email" ref="email" defaultValue={ this.state.signup.email } />
          <Input type="password" placeholder="password" ref="password" />
          <ButtonInput type="submit" className="btn-block" value="Sign Up" onClick={this.handleSubmit} />
        </form>

        <FacebookLogin class="facebook-signup btn-block" callToAction="Sign Up with Facebook" loginHandler={ this.handleFacebookLogin } />
      </div>
    )
  }
}

module.exports = Signup;
