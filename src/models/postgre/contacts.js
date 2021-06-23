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
		nome: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true,
				len: {
					args: [
						3,
						100,
					],
					msg: 'Por favor, forneça nomes de 3 até 100 caracteres. ',
				},
			},
		},
		celular: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true,
				len: {
					args: [
						13,
						13,
					],
					msg: 'Por favor, forneça telefones de ' +
				'13 caracteres no formato 5541959365078.',
				},
			},
		},
	}, {
		sequelize: sequelize,
		modelName: 'Contacts',
	});

	return Contacts;
};
