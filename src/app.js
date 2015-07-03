import React from 'react';
import Router from 'react-router';
import RouterContainer from './RouterContainer';
import routes from './routes';
import LoginActions from './actions/LoginActions';

let router = Router.create({
	routes: routes,
	location: Router.HistoryLocation
});

RouterContainer.set(router);

let token = localStorage.getItem('token');

if (token) {
	LoginActions.loginUser(token);
}

router.run((Handler, state) => {
	React.render(<Handler />, document.getElementById('app'))
});
