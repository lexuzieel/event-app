'use strict';

module.exports = (sequelize, DataTypes) => {
    const event_type = sequelize.define('EventType', {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
    }, {
        underscored: true,
    });

    event_type.associate = function (models) {
        // associations can be defined here
    };

    return event_type;
};
