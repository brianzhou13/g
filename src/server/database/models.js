var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema is going to adjust in respect to Google being so flexible
var gSchema = new Schema({
  bg_value: Number,
  timestamp: String,
  meal: String,
  year: String,
  month: String,
  date: String,
  hour: String,
  minute: String,
  second: String,
});

var gData = mongoose.model('gData', gSchema);

module.exports = gData;