'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('event_types', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
            },
            name: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            description: {
                allowNull: true,
                type: Sequelize.STRING
            },
            color: {
                allowNull: true,
                type: Sequelize.STRING
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('event_types');
    }
};
