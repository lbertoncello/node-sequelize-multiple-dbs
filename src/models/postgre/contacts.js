'use strict';

const {
	Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Contacts extends Model {


		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate (models) {
			// define association here
		}

	}
	Contacts.init({
		id: {
			type: DataTypes.UUIDV4,
			autoIncrement: true,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		name: DataTypes.STRING,
		cellphone: DataTypes.STRING,
	}, {
		sequelize: sequelize,
		modelName: 'Contacts',
	});

	return Contacts;
};
