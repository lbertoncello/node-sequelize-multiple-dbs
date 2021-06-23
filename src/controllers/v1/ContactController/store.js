const model = require('@models/sql');
const { checkPermission } = require('./utils');


async function store (req, res, next) {
	try {
		const user = req.user;
		const targetDb = req.params.targetDb;
		const isAllowed = await checkPermission(user, targetDb);

		if (!isAllowed.result) {
			return res.status(isAllowed.res.status).json({
				success: isAllowed.res.success,
				message: isAllowed.res.message,
			});
		}

		const accountsDao = req.body.contacts;
		const accounts = [];

		for (const accountDAO of accountsDao) {
			const account = await model[targetDb].
				sequelize.models.Contacts.create({
					nome: accountDAO.name,
					celular: accountDAO.cellphone,
				});

			accounts.push(account);
		}

		return res.status(200).json({
			success: true,
			message: 'Conta(s) inserida(s) com sucesso.',
			data: accounts,
		});
	} catch (e) {
		next(e);
	}
}

module.exports = store;
