function getDbUrl () {
	const name = process.env.DB_NAME;
	const host = process.env.DB_HOST;
	const port = process.env.DB_PORT;

	return `mongodb://${host}:${port}/${name}`;
}

module.exports = {
	name: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	url: getDbUrl(),
	saltRounds: parseInt(process.env.SALT_ROUNDS),
	pageSize: parseInt(process.env.PAGE_SIZE),
};
