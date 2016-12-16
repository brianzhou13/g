var g = require('./models');
var addTime = require('../helpers').timestampParser;

module.exports = {

	/* 
	 * @name: addEntry
	 * @input: A list of objects that we need to update into db
	 * @output: Added entry for all items in list into DB
	 */ 

	addEntry: (entry) => {
		/* input will be an obj of:
			{
				timestamp:
				bg_value:
				meal: (?)
			}
		*/

		// assume input is a string
		entry = addTime(JSON.parse(entry));

		// pass in the entry data and appropriately add it


		// parse that timestamp value
		// so we have to be able to chop it off
		// add on another value which would be the time. 



		g.findOne({'timestamp': entry.timestamp, 'bg_value': entry.bg_value,
							 meal: entry.meal, year: entry.year, month: entry.month,
							 hour: entry.hour, minute: entry.minute, second: entry.second}, (err, item) => {
			if(item === null) { // possibly could abstract the below if items passed in are for-sure correct
				console.log('value for entry is: ', entry);
				var entryObj = new g({
					timestamp: entry.timestamp,
					bg_value: entry.bg_value,
					meal: entry.meal,
					year: entry.year,
					month: entry.month,
					hour: entry.hour,
					date: entry.date,
					minute: entry.minute,
					second: entry.second,
				}).save((err, item) => {
					if(err) {
						console.log('error has occurred in findOne' + err);
						throw err;
					}
				});
			} else {

				// ugly fix as there's an entry that is 'undefined'
				if(item === undefined) {
					return; // do nothing
				}

				item.save((err, updated) => {
					console.log('updating the item found: ', updated);
					if(err) {
						console.log('error occured with updating in findOne' + err);
						throw err;
					}
				});				
			}
		});
	},

	getAll: (res) => {
		// input will be the response
		// this will get us all of the data within our mongo db
		g.find({}, (err, data) => {
			if(err) {
				console.log('error in getting back all g-entries' + err);
				res.status(400).send(err);
			} else {
				// sending all data back

				// console.log('data @ 0 is: ', data[0]);
					// data retrieved back looks good
				res.status(200).send(data);
			}
		});
	}
};



