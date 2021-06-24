'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const basename = path.basename(__filename);
const dbsSequelize = require('@config/db/sql/database');

const dbs = {};

fs.readdirSync(__dirname).
	filter((file) => (
		file.indexOf('.') !== 0 && file !== basename
	)).
	forEach((folder) => {
		fs.readdirSync(path.join(__dirname, folder)).
			filter((file) => (
				file.indexOf('.') !== 0 &&
				file !== basename &&
				file.slice(-3) === '.js'
			)).
			forEach((file) => {
				const model = require(path.join(__dirname, folder, file))(
					dbsSequelize[folder],
					Sequelize.DataTypes,
				);

				console.log(folder);

				dbs[folder] = {};
				dbs[folder][model.name] = model;
			});
	});

// fs.readdirSync(__dirname).
// 	filter((file) => (
// 		file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
// 	)).
// 	forEach((file) => {
// 		const model = require(path.join(__dirname, file))(
// 			dbsSequelize,
// 			Sequelize.DataTypes,
// 		);

// 		dbs[model.name] = model;
// 	});

Object.keys(dbsSequelize).forEach((dbKey) => console.log(dbKey));
console.log(dbs);

Object.keys(dbsSequelize).forEach((dbKey) => {
	Object.keys(dbs[dbKey]).forEach((modelName) => {
		if (dbs[dbKey][modelName].associate) {
			dbs[dbKey][modelName].associate(dbs);
		}

		dbs[dbKey].sequelize = dbsSequelize[dbKey];
		dbs[dbKey].Sequelize = Sequelize;
	});
});

// console.log(dbs);


// Object.keys(dbs).forEach((modelName) => {
// 	if (dbs[modelName].associate) {
// 		dbs[modelName].associate(dbs);
// 	}
// });

// dbs.sequelize = dbsSequelize;
// dbs.Sequelize = Sequelize;

module.exports = dbs;
