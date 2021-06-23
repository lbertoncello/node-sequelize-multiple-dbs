module.exports = {
	development: {
		databases: {
			varejao: {
				username: process.env.POSTGRE_USERNAME,
				password: process.env.POSTGRE_PASSWORD,
				database: process.env.POSTGRE_DB_NAME,
				host: process.env.POSTGRE_HOST,
				port: parseInt(process.env.POSTGRE_PORT),
				dialect: 'postgres',
				define: {
					timestamps: true,
				},
			},
			// macapa: {
			// 	username: process.env.POSTGRE_USERNAME,
			// 	password: process.env.POSTGRE_PASSWORD,
			// 	database: process.env.POSTGRE_DB_NAME,
			// 	host: process.env.POSTGRE_HOST,
			// 	port: parseInt(process.env.POSTGRE_PORT),
			// 	dialect: 'mysql',
			// 	define: {
			// 		timestamps: true,
			// 	},
			// },
		},
	},

	/*
	 * Dados para serem utilizados pelo sequelize-cli
	 */
	varejao: {
		username: process.env.POSTGRE_USERNAME,
		password: process.env.POSTGRE_PASSWORD,
		database: process.env.POSTGRE_DB_NAME,
		host: process.env.POSTGRE_HOST,
		port: parseInt(process.env.POSTGRE_PORT),
		dialect: 'postgres',
		define: {
			timestamps: true,
		},
	},

	// macapa: {
	// 	database: process.env.RDS_DATABASE2,
	// 	username: process.env.RDS_USERNAME2,
	// 	password: process.env.RDS_PASSWORD2,
	// 	host: process.env.RDS_HOSTNAME2,
	// 	port: process.env.RDS_PORT2,
	// 	dialect: 'mssql', // second database can have a different dialect
	// },
};
