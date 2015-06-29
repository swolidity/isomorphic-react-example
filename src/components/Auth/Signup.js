import React from 'react';
import { Input } from 'react-bootstrap';

class Signup extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <form className='form-horizontal'>
        <Input type='text' label='username' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
        <Input type='password' label='password' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
      </form>
    )
  }
}

module.exports = Signup;
