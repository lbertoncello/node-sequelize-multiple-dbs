const mongoose = require('mongoose');
const User = mongoose.model('User');

async function getDetail (req, res, next) {
	try {
		const _id = req.params.id;
		const user = await User.findById(_id);

		return res.status(200).json({
			success: true,
			message: 'Dados do usuário acessados com sucesso.',
			isAuthenticated: true,
			data: {
				_id: user._id,
				fullname: user.fullname,
				email: user.email,
				userType: user.userType,
				active: user.active,
				databaseAllowed: user.databaseAllowed,
			},
		});
	} catch (e) {
		next(e);
	}
}

module.exports = getDetail;
