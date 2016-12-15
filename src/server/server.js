var express = require('express');
var amqp = require('amqplib/callback_api');
var addEntry = require('./database/controllers').addEntry;
var db = require('./database/db');

var app = express();

// setup middleware
require('./middleware')(app, express);

// setup routes
require('./routes')(app, express);

var port = process.env.port || 8080;

app.listen(port, function() {
	console.log('listening now on port: ' + port);

	// add in a queue subscriber here for new data
	amqp.connect('amqp://localhost', function(err, conn) {

		//create the channel
		conn.createChannel(function(err, ch) {
			var q = 'data';
			var counter = 0;

			ch.assertQueue(q, {durable: false});

			console.log('queue is setup and awaiting messages');

			ch.consume(q, function(msg) {
				// console.log('msg received as: %s', msg.content.toString());
				let data = msg.content.toString();
				// add it into db
				addEntry(data);

				counter++;
			});
		})

	}, {noAck: true});

});