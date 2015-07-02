import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';


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

		if (LoginStore.isLoggedIn()) {
			// if user is logged in show logout link
			loginNavItem = <NavItem onClick={this.handleLogout}>logout</NavItem>;
		} else {
			// if user is not logged in show login link
			loginNavItem = <NavItemLink to={`/login`}>login</NavItemLink>;
		}

		return (
			<Navbar brand={<Link to='/'>Isomorphic React</Link>}>
				<Nav>
		      <NavItemLink to={`/users`}>users</NavItemLink>
					{loginNavItem}
		      <NavItemLink to={`/signup`}>signup</NavItemLink>
		      <DropdownButton eventKey={3} title='Dropdown'>
		        <MenuItem eventKey='1'>Action</MenuItem>
		        <MenuItem eventKey='2'>Another action</MenuItem>
		        <MenuItem eventKey='3'>Something else here</MenuItem>
		        <MenuItem divider />
		        <MenuItem eventKey='4'>Separated link</MenuItem>
		      </DropdownButton>
	    	</Nav>
			</Navbar>
			);
	}
}

export default Header
