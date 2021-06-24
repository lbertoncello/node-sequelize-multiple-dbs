const mongoose = require('mongoose');
const User = mongoose.model('User');

function getDetail (req, res, next) {
	try {
		const user = req.user;

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
			},
		});
	} catch (e) {
		next(e);
	}
}

module.exports = getDetail;
