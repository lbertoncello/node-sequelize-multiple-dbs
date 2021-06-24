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
						200,
					],
					msg: 'Por favor, forneça nomes de 3 até 200 caracteres. ',
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
		hooks: {
			beforeSave: (contact, options) => {
				contact.nome = contact.nome.toUpperCase();
				contact.celular = `+${contact.celular.slice(0, 2)} ` +
					`(${contact.celular.slice(2, 4)}) ${contact.celular.slice(4, 9)}-` +
					`${contact.celular.slice(9)}`;
			},
		},
	});

	return Contacts;
};
