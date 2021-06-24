const config = require('@config');

function connect () {
	const dbs = config.db.sql.database;
	const dbKeys = Object.keys(config.db.sql.database);
	const connections = [];

	for (const dbKey of dbKeys) {
		connections.push(dbs[dbKey].authenticate());
	}

	return dbs;
}

module.exports = () => connect();
