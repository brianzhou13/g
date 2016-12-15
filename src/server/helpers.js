module.exports = {
	timestampParser: (data) => {
		// input is the whole data obj

		let rec_date = data.timestamp;
		let new_date = {};

		let find_month_year = rec_date.split('-');
			// output ex. = ["2015", "01", "01T10:39:39"]

		// set the year and month property
		new_date.year = find_month_year[0];
		new_date.month = find_month_year[1];

		let find_day = (find_month_year[2]).split('T');
			// output ex. = ["01", "10:39:39"]

		// set the date property
		new_date.date = find_day[0];

		let find_time = (find_day[1]).split(':');
			// output ex. = ["10", "39", "39"]

		// set the time properties
		new_date.hour = find_time[0];
		new_date.minute = find_time[1];
		new_date.second = find_time[2];

		var final = Object.assign({}, data, new_date);

		return final;
	}
};