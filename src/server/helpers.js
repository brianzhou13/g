module.exports = {
	timestampParser: (data) => {
		// input is the whole data obj
		let rec_date = data.timestamp;
			// ex. = "2015-01-01T10:39:39"
		let new_date = {};

		let find_month_year = rec_date.split('-');
			// output ex. = ["2015", "01", "01T10:39:39"]

		// set the year and month property
		new_date.year = parseInt(find_month_year[0]);
		new_date.month = parseInt(find_month_year[1]);

		let find_day = (find_month_year[2]).split('T');
			// output ex. = ["01", "10:39:39"]

		// set the date property
		new_date.date = parseInt(find_day[0]);

		let find_time = (find_day[1]).split(':');
			// output ex. = ["10", "39", "39"]

		// set the time properties
		new_date.hour = parseInt(find_time[0]);
		new_date.minute = parseInt(find_time[1]);
		new_date.second = parseInt(find_time[2]);

		var final = Object.assign({}, data, new_date);
		return final;
	}
};