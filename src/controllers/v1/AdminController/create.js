const mongoose = require('mongoose');
const User = mongoose.model('User');

async function create (req, res, next) {
	try {
		let user = new User(req.body);

		user.userType = User.getTypeAdminStr();
		user = await user.save();

		if (user) {
			const data = {
				fullname: user.fullname,
				email: user.email,
				userType: user.userType,
			};

			return res.status(200).json({
				success: true,
				message: 'Usuário inserido com sucesso.',
				data: data,
			});
		}

		return res.status(422).json({
			success: false,
			message: 'Não foi possível inserir o usuário.',
		});
	} catch (e) {
		next(e);
	}
}

module.exports = create;
