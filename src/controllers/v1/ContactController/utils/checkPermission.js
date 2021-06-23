const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = async (user, targetDb) => {
	const allDatabasesAllowed = await User.getAllDatabasesAllowed();

	if (!allDatabasesAllowed.includes(targetDb)) {
		return {
			result: false,
			res: {
				status: 404,
				success: false,
				message: `O banco de dados '${targetDb}' não está existe.`,
			},
		};
	}

	if (!user.databasesAllowed.includes(targetDb)) {
		return {
			result: false,
			res: {
				status: 403,
				success: false,
				message: 'Você não tem permissão para ' +
                    `acessar o banco de dados '${targetDb}'.`,
			},
		};
	}

	return {
		result: true,
		res: {},
	};
};
