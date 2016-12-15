const mongoose = require('mongoose');

var db = mongoose.connection;
mongoose.connect('mongodb://localhost/g');

db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to Mongoose!');
});

// I don't think we'll use this
module.exports = {
	db: db
};