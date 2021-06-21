const mongoose = require('mongoose');
const User = mongoose.model('User');

async function vote (req, res, next) {
	try {
		const _id = req.user._id;
		const {
			movieId, score,
		} = req.body;
		let user = await User.findById(_id);

		user = await user.vote(movieId, parseInt(score));

		return res.status(200).json({
			success: true,
			message: 'Voto registrado com sucesso.',
		});
	} catch (e) {
		next(e);
	}
}

module.exports = vote;
