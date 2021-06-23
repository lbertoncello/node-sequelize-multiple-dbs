const adminRoutesV1 = require('./v1/adminRoutes');
const authRoutesV1 = require('./v1/authRoutes');
const baseRoutesV1 = require('./v1/baseRoutes');
const userRoutesV1 = require('./v1/userRoutes');
const contactRoutesPostgreV1 = require('./v1/ContactRoutes/varejao');

const v1Route = '/api/v1';

module.exports = (app) => {
	app.use(`${v1Route}`, baseRoutesV1);
	app.use(`${v1Route}/admin`, adminRoutesV1);
	app.use(`${v1Route}/auth`, authRoutesV1);
	app.use(`${v1Route}/user`, userRoutesV1);
	app.use(`${v1Route}/contact/postgre`, contactRoutesPostgreV1);
};
