import 'babel/polyfill';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import Router from 'react-router';
import router from './router';
import routes from './routes';
//import AltIso from 'alt/utils/AltIso'; TODO: use AltIso for server-side async rendering
//import alt from './alt';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';

mongoose.connect('mongodb://localhost:27017/iso-react');

const server = express();

server.use(morgan('dev'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname, 'public')));

// Register API middleware
server.use('/api', require('./api/api.js'));

const templateFile = path.join(__dirname, 'templates/index.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

server.get('/*', function(req, res) {

	router.create(Router, {
		routes: routes,
		location: req.url,
		onAbort:(abortReason) => {
			if (abortReason.constructor.name == 'Redirect') {
				let { to, params, query } = abortReason;
				let path = router.makePath(to, params, query);
				res.redirect(path);
			}
		}
	});

	router.run(Handler => {
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
