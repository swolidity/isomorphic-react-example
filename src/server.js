import 'babel/polyfill';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import Router from 'react-router';
import routes from './routes';

const server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname, 'public')));

// Register API middleware
server.use('/api', require('./api/api.js'));

const templateFile = path.join(__dirname, 'templates/index.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

server.get('/*', function(req, res) {
	Router.run(routes, req.url, Handler => {
		let data = {title: ''};
		data.body = React.renderToString(<Handler />);
		let html = template(data);
		res.send(html);
	});
});

// Launch the server
server.listen(server.get('port'), () => {
	if (process.send) {
		process.send('online');
	} else {
		console.log('The server is running at http://localhost:' + server.get('port'));
	}
});
