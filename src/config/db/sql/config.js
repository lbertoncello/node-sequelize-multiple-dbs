module.exports = {
	development: {
		databases: {
			varejao: {
				username: process.env.VAREJAO_USERNAME,
				password: process.env.VAREJAO_PASSWORD,
				database: process.env.VAREJAO_DB_NAME,
				host: process.env.VAREJAO_HOST,
				port: parseInt(process.env.VAREJAO_PORT),
				dialect: 'postgres',
				define: {
					timestamps: true,
				},
			},
			macapa: {
				username: process.env.MACAPA_USERNAME,
				password: process.env.MACAPA_PASSWORD,
				database: process.env.MACAPA_DB_NAME,
				host: process.env.MACAPA_HOST,
				port: parseInt(process.env.MACAPA_PORT),
				dialect: 'mysql',
				define: {
					timestamps: true,
				},
			},
		},
	},

	/*
	 * Dados para serem utilizados pelo sequelize-cli
	 */
	varejao: {
		username: process.env.VAREJAO_USERNAME,
		password: process.env.VAREJAO_PASSWORD,
		database: process.env.VAREJAO_DB_NAME,
		host: process.env.VAREJAO_HOST,
		port: parseInt(process.env.VAREJAO_PORT),
		dialect: 'postgres',
		define: {
			timestamps: true,
		},
	},

	/*
	 * Dados para serem utilizados pelo sequelize-cli
	 */
	macapa: {
		username: process.env.MACAPA_USERNAME,
		password: process.env.MACAPA_PASSWORD,
		database: process.env.MACAPA_DB_NAME,
		host: process.env.MACAPA_HOST,
		port: parseInt(process.env.MACAPA_PORT),
		dialect: 'mysql',
		define: {
			timestamps: true,
		},
	},
};
