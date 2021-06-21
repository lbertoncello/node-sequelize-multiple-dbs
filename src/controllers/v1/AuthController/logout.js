const mongoose = require('mongoose');
const User = mongoose.model('User');

async function logout (req, res, next) {
	try {
		const _id = req.user._id;
		const user = await User.findOneAndUpdate({
			_id,
		}, {
			token: '',
		}, {
			new: true,
		});

		if (!user) {
			return res.status(500).json({
				success: false,
				message: 'Usuário não encontrado.',
			});
		}

		return res.status(200).json({
			success: true,
			message: 'Logout realizado com sucesso.',
		});
	} catch (e) {
		next(e);
	}
}

module.exports = logout;
