import { Route } from 'react-router';
import React from 'react';

import App from './components/App/App';
import About from './components/About/About';
import Users from './components/Users/Users';

export default (
	<Route handler={App} path="/">
		<Route handler={About} path="/about" />
		<Route handler={Users} path="/users" />
	</Route>
);
