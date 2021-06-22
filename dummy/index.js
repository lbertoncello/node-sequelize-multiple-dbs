require('module-alias/register');
require('dotenv').config();

const database = require('@database');
const config = require('@config');

database.connect(config.db.mongo.url).then(async () => {
	const dummyUser = require('./User');

	const args = process.argv.slice(2);

	const number = args[0] ? parseInt(args[0]) : 1;
	const onlyOnCreation = args[1] ? JSON.parse(args[1].toLowerCase()) : false;

	/*
	 * Executar aqui as funções de inserção
	 */
	await dummyUser.insert({
		number,
		onlyOnCreation,
	});

	process.exit(0);
});
