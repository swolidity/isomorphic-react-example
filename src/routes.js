import { Route } from 'react-router';
import React from 'react';

import App from './components/App/App';
import About from './components/About/About';
import Users from './components/Users/Users';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

export default (
	<Route handler={App} path="/">
		<Route handler={About} path="/about" />
		<Route handler={Users} path="/users" />
		<Route handler={Login} path="/login" />
		<Route handler={Signup} path="/signup" />

		
	</Route>
);
