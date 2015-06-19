import { Route } from 'react-router';
import React from 'react';

import App from './components/App/App';
import About from './components/About/About';

export default (
	<Route handler={App} path="/">
		<Route handler={About} path="/about" />
	</Route>
);