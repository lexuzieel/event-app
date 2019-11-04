'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const types = [
            { name: "Искусство", color: "green" },
            { name: "Культура", color: "purple" },
            { name: "Встреча", color: "blue" },
            { name: "Спорт", color: "orange" },
            { name: "Игры", color: "cyan" },
        ];

        types.forEach(type => {
            type.created_at = type.updated_at = new Date()
        })

        return queryInterface.bulkInsert('event_types', types, {});
    },

    down: (queryInterface, Sequelize) => {
        // return queryInterface.bulkDelete('event_types', null, {});
    }
};
