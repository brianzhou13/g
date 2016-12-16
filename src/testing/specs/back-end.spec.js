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

  describe('able to work with data from the db', function() {
  	it('should return 200 status code from a /get request to /api/get-data', function(done) {
  		supertestPromise(app)
  			.get('/api/get-data')
  			.expect(200)
  			.then((res) => {
  				console.log('response received!');
  				done();
  			})
  			.catch((err) => {
  				console.log('error inside the status 200 test');
  			});
  	});

  	it('should return more than 100 datapoints from route: /api/get-data', function(done) {
  		supertestPromise(app)
  			.get('/api/get-data')
  			.then((res) => {
  				console.log(Object.keys(res));
  				expect(res.body.length).to.be.above(100);
  				done();
  			})
  			.catch((err) => {
  				console.log('error inside the 100 datapoint test');
  				done(err);
  			});
	  });

  	it('should return datapoints that have the right keys', function(done) {
  		supertestPromise(app)
  			.get('/api/get-data')
  			.then((res) => {
  				let data_point = res.body[(Math.floor(Math.random() * 100))];

  				expect(data_point).to.have.all.keys('_id', '__v', 'timestamp', 'bg_value', 'meal', 'year', 'month', 'date', 'hour', 'minute', 'second');

  				done();
  			})
  			.catch((err) => {
  				console.log('error inside the data-keys check');
  				done(err);
  			})
	  });

  });

  describe('testing the helper fn for parsing time', function() {
  	it('should properly properly parse timestamp', function(done) {
  		var testInput =  {
  									    _id: "58530f497f8a7e1380655923",
  									    timestamp: "2015-01-01T10:39:39",
  									    bg_value: 74,
  									    meal: "none",
  									    __v: 1
  									  };
  		// const testOutput = timestampFn(testInput);
  		// console.log('value for testOutput is: ', testOutput);
  		//check for all keys
  		expect(timestampFn(testInput)).to.have.all.keys('_id', '__v', 'timestamp', 'bg_value', 'meal', 'year', 'month', 'date', 'hour', 'minute', 'second');

  		//check for all keys aren't empty and are ok
  		for(var key in timestampFn(testInput)) {
  			// ** come back to investigate why testOutput above won't work
  			// ** and why if we leave code 83 uncommented, nothing will run past it. 
  			expect((timestampFn(testInput))[key]).to.be.ok;
				expect((timestampFn(testInput))[key]).to.not.be.empty;
  		}

  		done();
  	});
  });
});