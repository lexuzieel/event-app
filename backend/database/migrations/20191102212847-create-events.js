'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.createTable('events', {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    type: Sequelize.INTEGER,
                },
                type_id: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'event_types',
                        key: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade',
                },
                user_id: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade',
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING
                },
                description: {
                    allowNull: true,
                    type: Sequelize.STRING
                },
                location: {
                    allowNull: false,
                    type: Sequelize.TEXT
                },
                arranged_at: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updated_at: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
            }),
            require('../seeders/create-event-types')
                .up(queryInterface, Sequelize),
            queryInterface.createTable('events_users', {
                event_id: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'events',
                        key: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade',
                },
                user_id: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade',
                },
                comment: {
                    allowNull: true,
                    type: Sequelize.STRING
                },
                participating: {
                    allowNull: false,
                    type: Sequelize.ENUM(['yes','no','maybe'])
                },
            }),
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.dropTable('events_users'),
            queryInterface.dropTable('events'),
        ]);
    }
};
