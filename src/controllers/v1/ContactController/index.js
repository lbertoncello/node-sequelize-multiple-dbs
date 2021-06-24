const store = require('./store');
const show = require('./show');


const routes = {
	store: '/:targetDb',
	show: '/:targetDb',
};


module.exports = {
	store,
	show,
	routes,
};
