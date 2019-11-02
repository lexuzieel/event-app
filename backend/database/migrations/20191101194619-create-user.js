'use strict';

const table = 'users';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.createTable(table, {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    type: Sequelize.INTEGER
                },
                profile_id: {
                    unique: true,
                    allowNull: false,
                    type: Sequelize.INTEGER
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING
                },
                username: {
                    allowNull: true,
                    type: Sequelize.STRING
                },
                profile_url: {
                    type: Sequelize.STRING
                },
                avatar_url: {
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
            }),
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.dropTable(table),
        ]);
    }
};
