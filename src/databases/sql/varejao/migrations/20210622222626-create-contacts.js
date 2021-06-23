'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Contacts', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			nome: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			celular: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Contacts');
	},
};
