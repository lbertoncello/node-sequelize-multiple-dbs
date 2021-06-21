const create = require('./create');
const detail = require('../UserController/detail');
const detailById = require('../UserController/detailById');
const activate = require('../UserController/activate');
const deactivate = require('../UserController/deactivate');
const update = require('../UserController/update');
const updateById = require('../UserController/updateById');

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
