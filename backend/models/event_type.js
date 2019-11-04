'use strict';

module.exports = (sequelize, DataTypes) => {
    const event_type = sequelize.define('EventType', {
        color: {
            type: DataTypes.STRING
        },
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
