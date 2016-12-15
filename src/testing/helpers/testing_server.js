var express = require('express');
var amqp = require('amqplib/callback_api');
var addEntry = require('../../server/database/controllers').addEntry;
var db = require('../../server/database/db');

/* TESTING_SERVER USED FOR TESTING */


var app = express();

// setup middleware
require('../../server/middleware')(app, express);

// setup routes
require('../../server/routes')(app, express);

module.exports = {
	app: app
};