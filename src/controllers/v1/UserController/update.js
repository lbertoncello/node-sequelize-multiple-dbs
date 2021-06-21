const mongoose = require('mongoose');
const User = mongoose.model('User');

async function update (req, res, next) {
	try {
		let user = await User.findById(req.user._id);

		Object.assign(user, req.body);
		user = await user.save();

		if (user) {
			const data = {
				fullname: user.fullname,
				email: user.email,
				userType: user.userType,
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
