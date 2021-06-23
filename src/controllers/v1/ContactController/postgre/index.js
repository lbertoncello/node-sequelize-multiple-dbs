const store = require('./store');
const show = require('./show');


const routes = {
	store: '',
	read: '',
	detail: '/detail',
	detailById: '/:id/detail',
	update: '',
	updateById: '/:id',
	activate: '/:id/activate',
	deactivate: '/:id/deactivate',
};


module.exports = {
	store,
	show,
	routes,
};
