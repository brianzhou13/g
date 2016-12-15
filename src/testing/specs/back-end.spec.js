var expect = require('chai').expect;
var supertest = require('supertest');
var supertestPromise = require('supertest-as-promised');
var timestampFn = require('../../server/helpers.js').timestampParser;

var app = require('../helpers/testing_server.js').app;

// actions that are ran before describe suites run
var testPort = 9000;
var server = app; // instance of our rnker-scraper server

server = app.listen(testPort, function () {
 console.log('testing-server is running on ' + testPort);
});


describe('Server Side Specifications', function() {
  this.timeout(30000);
  console.log(`entered into the server-side tests`);
  

  after(function() {
    // console.log('closing servers');
    console.log(`closing server`);
    if (server) server.close();
  });

  describe('testing the helper fn for parsing time', function() {
  	it('should properly properly parse timestamp', function(done) {
  		var testInput =  {
  									    "_id": "58530f497f8a7e1380655923",
  									    "timestamp": "2015-01-01T10:39:39",
  									    "bg_value": 74,
  									    "meal": "none",
  									    "__v": 0
  									  };
  		const testOuput = timestampFn(testInput);
  		console.log('value for testOutput is: ', testOutput);
  		//check for all keys
  		expect(testOutput).to.have.all.keys('timestamp', 'bg_value', 'meal', 'year', 'month', 'date', 'hour', 'minute', 'second');

  		//check for all keys aren't empty and are ok
  		for(var key in testOutput) {
  			expect(testOutput[key]).is.ok;
				expect(testOutput[key]).is.not.empty;
  		}

  		done();
  	});
  });

});
