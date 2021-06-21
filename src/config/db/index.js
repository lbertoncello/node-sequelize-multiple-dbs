function getDbUrl () {
	const name = process.env.MONGO_NAME;
	const host = process.env.MONGO_HOST;
	const port = process.env.MONGO_PORT;
	const username = process.env.MONGO_USERNAME;
	const password = process.env.MONGO_PASSWORD;
	let url = 'mongodb://';

	if (username && password) {
		url += `${username}:${password}@`;
	}

	url += `${host}:${port}/${name}`;

	return url;
}

module.exports = {
	name: process.env.MONGO_NAME,
	host: process.env.MONGO_HOST,
	port: process.env.MONGO_PORT,
	username: process.env.MONGO_USERNAME,
	password: process.env.MONGO_PASSWORD,
	authSource: process.env.MONGO_AUTH_SOURCE || 'admin',
	url: getDbUrl(),
	saltRounds: parseInt(process.env.SALT_ROUNDS),
	pageSize: parseInt(process.env.PAGE_SIZE),
};
