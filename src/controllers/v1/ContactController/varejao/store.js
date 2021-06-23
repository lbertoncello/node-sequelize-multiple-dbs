const model = require('@models').varejao;

async function store (req, res, next) {
	try {
		const accountsDao = req.body.contacts;
		const accounts = [];

		for (const accountDAO of accountsDao) {
			const account = await model.sequelize.models.Contacts.create({
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
