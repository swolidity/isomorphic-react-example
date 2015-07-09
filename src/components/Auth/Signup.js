import React from 'react';
import SignupActions from '../../actions/SignupActions';
import SignupStore from '../../stores/SignupStore';
import { Input, ButtonInput } from 'react-bootstrap';

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
      password: this.refs.password.getValue()
    };

    SignupActions.updateSignup(signup);

    SignupStore.signup();
  }

  render() {
    return(
      <div>
        <p>{this.state.errorMessage}</p>
        <form className='form-horizontal'>
          <Input type="text" label="username" labelClassName="col-xs-2" wrapperClassName="col-xs-10" ref="username" defaultValue={this.state.signup.username} />
          <Input type="password" label="password" labelClassName="col-xs-2" wrapperClassName="col-xs-10" ref="password" />
          <ButtonInput type="submit" value="Sign Up" wrapperClassName="col-xs-10" onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}

module.exports = Signup;
