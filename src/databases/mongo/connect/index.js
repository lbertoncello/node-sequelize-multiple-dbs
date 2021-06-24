const mongoose = require('mongoose');
const config = require('@config');

function connect (dbUrl) {
	mongoose.connection.
		on('error', console.error).
		on('disconnected', connect);

	return mongoose.connect(dbUrl, {
		authSource: config.db.mongo.authSource,
		keepAlive: 1,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	}).then(
		() => console.log('MongoDB connected.'),
		(err) => {
			console.error(err);
			console.error('Error during connection.');
		},
	);
}

module.exports = (dbName) => connect(dbName);
