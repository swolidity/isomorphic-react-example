import React from 'react';
import { RouteHandler } from 'react-router';
import Header from '../Header/Header.js';

require('./App.scss');

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />

				<div className="app-main">
					<RouteHandler/>
				</div>

			</div>
			);
	}
}


export default App;
