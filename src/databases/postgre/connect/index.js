const config = require('@config');

function connect () {
	return config.db.postgre.database.authenticate();
}

module.exports = () => connect();
