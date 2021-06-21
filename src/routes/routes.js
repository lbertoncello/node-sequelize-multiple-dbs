const adminRoutesV1 = require('./v1/adminRoutes');
const authRoutesV1 = require('./v1/authRoutes');
const baseRoutesV1 = require('./v1/baseRoutes');
const movieRoutesV1 = require('./v1/movieRoutes');
const userRoutesV1 = require('./v1/userRoutes');

const v1Route = '/api/v1';

module.exports = (app) => {
	app.use(`${v1Route}`, baseRoutesV1);
	app.use(`${v1Route}/admin`, adminRoutesV1);
	app.use(`${v1Route}/auth`, authRoutesV1);
	app.use(`${v1Route}/movie`, movieRoutesV1);
	app.use(`${v1Route}/user`, userRoutesV1);
};
