var amqp = require('amqplib/callback_api');
	// pretend as a worker to add in random data into our random mongodb
amqp.connect('amqp://localhost', function(err, conn) {

	conn.createChannel(function(err, ch) {

		const q = 'data';
		ch.assertQueue(q, {durable: false}); // what do they mean (?)

		let counter = 1;
		let date = 1;
		let month = 1; // start at january
	
		while(counter <= 35) {
			// call a generateData fn to generate the obj
			if(date >= 32) {
				// reset the date
				date = 1;
				month++;
			}

			// dat should be a string
			let dat = generateNum(date, month);

			// setInterval(function() {
			setTimeout(() => {
				ch.sendToQueue(q, dat);
				console.log('msg was sent');
			}, 1000 * date);
			counter++;
			date++;
			// }, 2000);
		}

	});
	// then after everything, you have a setTimeout to close the connection
	setTimeout(function() {
		conn.close();
		process.exit(0);
	}, 60000);
});

// need 100 datapoints for 3 months ~ 1 point a day

var generateNum = (d, m) => {
	let value = 0;
	let data = {};
	let time = 0; // adjusted 

	let hour;
	let minute;
	let meal;

	// generate a b_g value
	while(value < 80 || value > 150) {
		value = Math.random() * 150;
	}

	// generate a date and time string
	let data_okay = false;
	while(!data_okay) {
		//define time
		hour = Math.floor(Math.random() * 12); //number between 0 and 12
		minute = Math.floor(Math.random() * 59); // number between 0 and 59

		// define b_g
		value = Math.floor(Math.random() * 210);

		// define meal
		meal = Math.random();

		console.log('meal value is: '+ meal);
		if (meal < 0.3) {
			data.meal = "before_meal";
		} else if (meal >= 0.3 && meal <= 0.6) {
			data.meal = "after_meal";
		} else {
			data.meal = "none";
		}

		// else if meal >= 0.6 -- nothing gets assigned

		// checks for all value to make sure they are true
		if(hour >= 1 && hour <= 24 && minute >= 1 && minute <= 59 && value > 80 || value < 210) {
			data_okay = true;
		}
	}

	// if minute is less than 10, we concat a 0 in its front for display purposes
	minute = minute >= 10 ? minute.toString() : "0" + minute; 
	hour = hour >= 10 ? hour.toString() : "0" + hour;
	m = m >= 10 ? m.toString() : "0" + m;
	d = d >= 10 ? d.toString() : "0" + d;

	let str = "2015-" + m + "-" + d + "T" + hour + ":" + minute + ":" + minute;
	data.timestamp = str;
	data.bg_value = value;

	console.log('returning the data value: ', data);
	return new Buffer(JSON.stringify(data));
};


