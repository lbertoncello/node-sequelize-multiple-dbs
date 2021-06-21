const login = require('./login');
const logout = require('../AuthController/logout');

const routes = {
	login: '/login',
	logout: '/logout',
};

module.exports = {
	routes,
	login,
	logout,
};
