const model = require('@models/postgre');

async function show (req, res, next) {
	try {
		const accounts = await model.sequelize.models.Contacts.findAll();

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