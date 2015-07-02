import React from 'react';
import Router from 'react-router';
import router from './router';
import routes from './routes';

router.create(Router, {
	routes: routes,
	location: Router.HistoryLocation
});

router.run((Handler, state) => {
	React.render(<Handler />, document.getElementById('app'))
});
