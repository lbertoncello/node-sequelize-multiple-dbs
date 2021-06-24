require('module-alias/register');
require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cons = require('consolidate');

const app = express();

const database = require('@database');
const config = require('@config');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: true,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

const dbConnections = [
	database.mongo.connect(config.db.mongo.url),
	database.sql.connect(),
];

Promise.all(dbConnections).then(() => {
	const routes = require('@routes/routes');
	const errorHandler = require('@middlewares/error-handler');
	const utils = require('@utils');

	routes(app);
	errorHandler(app);
	utils.createAdminOnStart();
});

module.exports = app;
