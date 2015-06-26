import React from 'react';
import { RouteHandler } from 'react-router';
import Header from '../Header/Header.js';

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />

				<div className="container">
					<RouteHandler/>
				</div>

			</div>
			);
	}
}


export default App;