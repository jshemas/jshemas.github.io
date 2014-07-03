var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	compress = require('compression'),
	logfmt = require("logfmt"),
	errorhandler = require('errorhandler'),
	ECT = require('ect');

var app = module.exports = express();

if (app.get('env') === 'prod') {
	app.use(compress());
	app.set('views', __dirname + '/dist/app/views');
	var ectRenderer = ECT({ watch: true, root: __dirname + '/dist/app/views', ext : '.html' });
	app.use(express.static(__dirname + '/dist', { maxAge: 345600000 })); // four days
	app.use(errorhandler());
} else {
	app.set('views', __dirname + '/client/app/views');
	var ectRenderer = ECT({ watch: true, root: __dirname + '/client/app/views', ext : '.html' });
	app.use(express.static(__dirname + '/client'));
	app.use(errorhandler({dumpExceptions: true, showStack: true}));
}


app.use(logfmt.requestLogger());
app.engine('.html', ectRenderer.render);
app.set('view engine', 'html');
app.use(bodyParser());
app.use(methodOverride());

require('./server/routes.js')(app);
console.log("process.env.PORT:",process.env.PORT);
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Starting Server on Port:" + port);
});