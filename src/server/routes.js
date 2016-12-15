var path = require('path');
var getAll = require('./database/controllers').getAll; 

module.exports = function(app, express) {

	// have a route to get all db values
	app.route('/api/get-data')
		.get(function(req, res) {
			console.log('entered into the /api/get-data route');
			getAll(res);
		});

	app.route('*')
		.get(function(req, res) {
		  res.sendFile(path.join(__dirname, '../client/index.html'));
		});
};