import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';

require('./Header.scss');

class Header extends React.Component {

	constructor() {
    super();

		this.state = LoginStore.getState();

		this.handleChange = this.handleChange.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
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

	handleLogout(e) {
		e.preventDefault();
		LoginActions.logoutUser();
	}

	render() {
		let loginNavItem;
		let signupNavItem;
		let profileDropdown;

		if (LoginStore.isLoggedIn()) {
			// if user is logged in show logout link
			loginNavItem = <NavItem onClick={this.handleLogout}>logout</NavItem>;
			signupNavItem = null;

			profileDropdown = <DropdownButton eventKey={3} title={
													<ProfilePhoto
														width={35}
														height={35}
														photo={this.state.user.photo }
													/>
												}
												className="profileDropdown"
												noCaret={true}
												>
													<MenuItem eventKey='1'><Link to="user-profile" params={{ username: this.state.user.username }}>View Profile</Link></MenuItem>
													<MenuItem eventKey='2'>Another action</MenuItem>
													<MenuItem eventKey='3'>Something else here</MenuItem>
													<MenuItem divider />
													<MenuItem eventKey='4'>Separated link</MenuItem>
												</DropdownButton>;
		} else {
			// if user is not logged in show login link
			loginNavItem = <NavItemLink to={`/login`}>login</NavItemLink>;
			signupNavItem = <NavItemLink to={`/signup`}>signup</NavItemLink>;

			profileDropdown = null;
		}

		return (
			<Navbar className="Navbar" brand={<Link to='/'>Isomorphic React</Link>}>
				<Nav right>
		      <NavItemLink to="/users">users</NavItemLink>
		      <NavItemLink to="/chat">chat</NavItemLink>
					{loginNavItem}
					{signupNavItem}
		      {profileDropdown}
	    	</Nav>
			</Navbar>
			);
	}
}

export default Header
