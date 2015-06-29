import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';


class Header {

	render() {
		return (
			<Navbar brand={<Link to='/'>Isomorphic React</Link>}>
				<Nav>
		      <NavItemLink to={`/users`}>users</NavItemLink>
		      <NavItemLink to={`/login`}>login</NavItemLink>
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
