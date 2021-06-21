const randomstring = require('randomstring');
const randomEmail = require('random-email');
const nodeRandomName = require('node-random-name');
const pickRandom = require('pick-random');
const mongoose = require('mongoose');
const User = mongoose.model('User');


module.exports = {
	make: function (number) {
		const users = [];

		for (let i = 0; i < number; i++) {
			const user = new User();

			user.email = randomEmail();
			user.fullname = nodeRandomName();
			user.password = randomstring.generate();
			user.userType = pickRandom(User.getUserTypes())[0];

			users.push(user);
		}

		return users;
	},

	insert: async function ({
		number = 1, onlyOnCreation = true,
	}) {
		const count = await User.countDocuments();

		if (onlyOnCreation && count > 0) {
			console.log('The documents has not been inserted because ' +
				'this collection has at least 1 document inserted.');
			console.log('Pass the second argument as "false" if ' +
				'you want to ignore this constraint.');

			return;
		}

		const users = this.make(number);

		try {
			const docs = await User.create(users);

			console.log(`${docs.length} documents has been inserted.`);
		} catch (e) {
			console.error(e);
			console.error('Erro ao inserir dados dummy no banco de dados.');
		}
	},
};
