'use strict';
var _ = require('underscore'),
	path = require('path');

var routes = [
	// Views
	{
		path: '/partials/*',
		httpMethod: 'GET',
		middleware: [function (req, res) {
			var requestedView = path.join('./', req.url);
			res.render(requestedView, {'env': process.env.NODE_ENV});
		}]
	},

	// All other get requests should be handled by AngularJS's client-side routing system
	{
		path: '/*',
		httpMethod: 'GET',
		middleware: [function (req, res) {
			res.render('index', {'env': process.env.NODE_ENV});
		}]
	}
];

function ensureAuthorized(req, res, next) {
	// public can see everything!
	return next();
}

module.exports = function (app) {
	_.each(routes, function (route) {
		route.middleware.unshift(ensureAuthorized);
		var args = _.flatten([route.path, route.middleware]);

		switch (route.httpMethod.toUpperCase()) {
		case 'GET':
			app.get.apply(app, args);
			break;
		case 'POST':
			app.post.apply(app, args);
			break;
		case 'PUT':
			app.put.apply(app, args);
			break;
		case 'DELETE':
			app.delete.apply(app, args);
			break;
		default:
			throw new Error('Invalid HTTP method specified for route ' + route.path);
			//break; //will never get here because of throw
		}
	});
};