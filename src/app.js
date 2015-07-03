import React from 'react';
import Router from 'react-router';
import router from './router';
import routes from './routes';
import LoginActions from './actions/LoginActions';

router.create(Router, {
	routes: routes,
	location: Router.HistoryLocation
});

let token = localStorage.getItem('token');

if (token) {
	LoginActions.loginUser(token);
}

router.run((Handler, state) => {
	React.render(<Handler />, document.getElementById('app'))
});
