const mongoose = require('mongoose');
const User = mongoose.model('User');

async function activate (req, res, next) {
	try {
		const _id = req.params.id;
		let user = await User.findById(_id);

		user = await user.activate();

		return res.status(200).json({
			success: true,
			message: 'Usuário ativado com sucesso',
			data: {
				_id: user._id,
				fullname: user.fullname,
				email: user.email,
				userType: user.userType,
				active: user.active,
			},
		});
	} catch (e) {
		next(e);
	}
}

module.exports = activate;
