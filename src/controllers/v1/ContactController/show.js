const model = require('@models/sql');
const { checkPermission } = require('./utils');


async function show (req, res, next) {
	try {
		const user = req.user;
		const targetDb = req.params.targetDb;
		const isAllowed = checkPermission(user, targetDb);

		if (!isAllowed.result) {
			return res.status(isAllowed.res.status).json({
				success: isAllowed.res.success,
				message: isAllowed.res.message,
			});
		}

		const accounts =
			await model[targetDb].sequelize.models.Contacts.findAll();

		return res.status(200).json({
			success: true,
			message: 'Conta(s) lida(s) com sucesso.',
			data: accounts,
		});
	} catch (e) {
		next(e);
	}
}

module.exports = show;
