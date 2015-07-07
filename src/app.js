import React from 'react';
import Router from 'react-router';
import RouterContainer from './RouterContainer';
import routes from './routes';
import LoginActions from './actions/LoginActions';
import RouterActions from './actions/RouterActions';
import Iso from 'iso';
import alt from './alt';

let router = Router.create({
	routes: routes,
	location: Router.HistoryLocation
});

RouterContainer.set(router);

Iso.bootstrap((state, meta, container) => {

	alt.bootstrap(state);

	let token = localStorage.getItem('token');

	if (token) {
		LoginActions.loginUser(token);
	}

	router.run((Handler, state) => {

		RouterActions.changeRoute(state);

		let node = <Handler />;
		React.render(node, container);
	});

});
