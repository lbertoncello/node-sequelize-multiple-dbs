const mongoose = require('mongoose');
const User = mongoose.model('User');

async function createAdminOnStart () {
	const admin = new User();

	admin.fullname = 'Root admin';
	admin.password = 'admin';
	admin.email = 'admin@admin.com';
	admin.userType = User.getTypeAdminStr();

	await User.insertIfNotExists(admin);
}

module.exports = createAdminOnStart;
