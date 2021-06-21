const mongoose = require('mongoose');
const User = mongoose.model('User');
const getBearerToken = require('./utils/getBearerToken');

async function authAdmin (req, res, next) {
	try {
		const token = getBearerToken(req);
		const user = await User.findByToken(token);

		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'O usuário não está autenticado.',
			});
		}

		if (!user.isActive()) {
			return res.status(406).json({
				success: false,
				message: 'O usuário não está ativo.',
			});
		}

		req.token = token;
		req.user = user;

		next();
	} catch (e) {
		next(e);
	}
}

module.exports = authAdmin;
