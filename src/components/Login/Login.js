import React from 'react';
import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';
import { Input, ButtonInput } from 'react-bootstrap';
import FacebookLogin from '../FacebookLogin/FacebookLogin';

require('./Login.scss');

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

  handleFacebookLogin = (res) => {
    LoginStore.fb_login(res.id);
  }

  render() {

		if(LoginStore.isLoading()) {
			return (
				<div>
					<img src="/spinner.gif" />
				</div>
      );
		}

    return (
      <div className="Login col-xs-12 col-md-5 center-block">

        <p>{this.state.errorMessage}</p>

        <form>
          <Input type="text" placeholder="username" ref="username" defaultValue={this.state.login.username} />
          <Input type="password" placeholder="password" ref="password" />
          <ButtonInput className="btn-block" type="submit" value="Login" onClick={this.handleSubmit} />
        </form>

        <FacebookLogin class="facebook-login btn-block" loginHandler={ this.handleFacebookLogin } />

      </div>

    );
  }

}

module.exports = Login;
