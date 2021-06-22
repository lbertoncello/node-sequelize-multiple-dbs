module.exports = {
	username: process.env.POSTGRE_USERNAME,
	password: process.env.POSTGRE_PASSWORD,
	database: process.env.POSTGRE_DB_NAME,
	host: process.env.POSTGRE_HOST,
	port: process.env.POSTGRE_PORT,
	dialect: 'postgres',
	define: {
		timestamps: true,
	},
};
