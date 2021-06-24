const mongoose = require('mongoose');
const User = mongoose.model('User');
const stringUtils = require('@utils/string');

async function update (req, res, next) {
	try {
		const _id = req.params.id;
		const userData = req.body;

		/*
		 * Substitui os caracteres especiais no nome dos bancos de dados
		 */
		for (let i = 0; i < userData.databasesAllowed.length; i++) {
			userData.databasesAllowed[i] = stringUtils.
				replaceSpecialCharacters(userData.databasesAllowed[i]);
		}

		let user = await User.findById(_id);

		Object.assign(user, userData);
		user = await user.save();

		if (user) {
			const data = {
				fullname: user.fullname,
				email: user.email,
				userType: user.userType,
				databasesAllowed: user.databasesAllowed,
			};

			return res.status(200).json({
				success: true,
				message: 'Usuário alterado com sucesso.',
				data: data,
			});
		}

		return res.status(422).json({
			success: false,
			message: 'Não foi possível alterar o usuário.',
		});
	} catch (e) {
		next(e);
	}
}

module.exports = update;
