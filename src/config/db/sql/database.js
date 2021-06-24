const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const dbsSequelize = {};

// Extract the database information into an array
const databases = Object.keys(config.databases);

for (const database of databases) {
	const dbPath = config.databases[database];

	dbsSequelize[database] = new Sequelize(
		dbPath.database,
		dbPath.username,
		dbPath.password,
		dbPath,
	);
}

module.exports = dbsSequelize;
