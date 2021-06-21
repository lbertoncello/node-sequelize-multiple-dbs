const create = require('./create');
const detail = require('./detail');
const detailById = require('./detailById');
const activate = require('./activate');
const deactivate = require('./deactivate');
const update = require('./update');
const updateById = require('./updateById');

const routes = {
	create: '',
	read: '',
	detail: '/detail',
	detailById: '/:id/detail',
	update: '',
	updateById: '/:id',
	activate: '/:id/activate',
	deactivate: '/:id/deactivate',
};

module.exports = {
	routes,
	create,
	detail,
	detailById,
	update,
	updateById,
	activate,
	deactivate,
};
