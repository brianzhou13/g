var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpack = require('webpack');
var path = require('path');
var webpackConfig = require('../../webpack.config');

var compiler = webpack(webpackConfig);

module.exports = function(app, express) {

	app.use(webpackDevMiddleware(compiler, {
		hot: true,
		publicPath: webpackConfig.output.publicPath,
		stats: { colors: true }
	}));

	app.use(webpackHotMiddleware(compiler, {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000,
	}));

	app.use(function(req, res, next) {
		console.log('[LOG @ Middleware] handling' + req.url);
		next();
	});

	// app.set('views', __dirname + '/views');
	// app.set('view engine', 'ejs');

	// app.use(express.static(__dirname + '/../client/dist/index.html'));
}