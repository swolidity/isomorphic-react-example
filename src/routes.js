import { Route, DefaultRoute } from 'react-router';
import React from 'react';

import App from './components/App/App';
import About from './components/About/About';
import Users from './components/Users/Users';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import UserProfile from './components/UserProfile/UserProfile';
import Settings from './components/Settings/Settings';
import UserProfileSettings from './components/UserProfileSettings/UserProfileSettings';
import AccountSettings from './components/AccountSettings/AccountSettings';

export default (
	<Route handler={App} path="/">
		<Route handler={About} path="/about" />
		<Route handler={Users} path="/users" />
		<Route handler={Login} name="login" path="/login" />
		<Route handler={Signup} path="/signup" />

		<Route handler={Settings} path="/settings" >
			<DefaultRoute name="settings-profile" handler={UserProfileSettings} />
			<Route handler={AccountSettings} path="/settings/account" />
		</Route>

		// user profile
		<Route handler={UserProfile} path="/:username" />
	</Route>
);
