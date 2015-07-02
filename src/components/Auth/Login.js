import React from 'react';
import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';
import { Input, ButtonInput } from 'react-bootstrap';

class Login extends React.Component {
  constructor() {
    super();
    this.state = LoginStore.getState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();

    let login = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue()
    };

    LoginActions.updateLogin(login);

    LoginStore.login();
  }

  render() {

		if(LoginStore.isLoading()) {
			return (
				<div>
					<img src="/spinner.gif" />
				</div>
      );
		}

    return(
      <div>
        <p>Error: {this.state.errorMessage}</p>
        <form className="form-horizontal">
          <Input type="text" label="username" labelClassName="col-xs-2" wrapperClassName="col-xs-10" ref="username" defaultValue={this.state.login.username} />
          <Input type="password" label="password" labelClassName="col-xs-2" wrapperClassName="col-xs-10" ref="password" />
          <ButtonInput type="submit" value="Login" wrapperClassName="col-xs-10" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }

}

module.exports = Login;
