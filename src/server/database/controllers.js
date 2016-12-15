var g = require('./models');

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
		console.log('entry received: ' + entry);

		g.findOne({'timestamp': entry.timestamp, 'bg_value': entry.bg_value, meal: entry.meal}, (err, item) => {
			if(item === null) { // possibly could abstract the below if items passed in are for-sure correct
				var entryObj = new g({
					timestamp: entry.timestamp,
					bg_value: entry.bg_value,
					meal: entry.meal,
				}).save((err, item) => {
					if(err) {
						console.log('error has occurred in findOne' + err);
						throw err;
					}
				});
			} else {
				item.save((err, updated) => {
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
			} else {
				// sending all data back
				res.send(data);
			}
		});
	}
};



