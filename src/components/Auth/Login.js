import React from 'react';
import { Input, ButtonInput } from 'react-bootstrap';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      password: ''
    };
  }

  _login(e) {
    e.preventDefault();

    Auth.login(this.state.user, this.state.password)
      .catch((err) => {
        console.log("Error loggin in", err);
      });
  }

  render() {
    return(
      <form className='form-horizontal'>
        <Input type='text' label='username' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
        <Input type='password' label='password' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
        <ButtonInput type="submit" value="Login" wrapperClassName='col-xs-10' />
      </form>
    )
  }

}

module.exports = Login;
