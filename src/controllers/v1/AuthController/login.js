const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = async function (req, res, next) {
	try {
		const email = req.body.email;
		const password = req.body.password;
		let user = await User.findOne().byEmail(email);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'Email de usuário não encontado!',
			});
		}

		if (!await user.checkPasswordMatch(password)) {
			return res.status(400).json({
				success: false,
				message: 'Senha errada!',
			});
		}

		if (!user.isActive()) {
			return res.status(406).json({
				success: false,
				message: 'O usuário não está ativo.',
			});
		}

		user = await user.generateToken();
		const data = {
			token: user.token,
		};

		return res.cookie('authToken', user.token).status(200).
			json({
				success: true,
				message: 'Login realizado com sucesso.',
				data: data,
			});
	} catch (e) {
		next(e);
	}
};
