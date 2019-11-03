'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const types = [
            { name: "Искусство" },
            { name: "Культура" },
            { name: "Встреча" },
            { name: "Спорт" },
            { name: "Игры" },
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
