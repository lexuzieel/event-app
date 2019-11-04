'use strict';

const _ = require('lodash')
const validator = require('validator')

module.exports = (sequelize, DataTypes) => {
    const event = sequelize.define('Event', {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        latitude: {
            type: DataTypes.FLOAT
        },
        longitude: {
            type: DataTypes.FLOAT
        },
        arrangedAt: {
            type: DataTypes.DATE
        },
    }, {
        underscored: true,
    });

    event.associate = function (models) {
        event.belongsTo(models.User, {
            foreignKey: 'user_id',
        })
        event.belongsTo(models.EventType, {
            as: 'type',
            foreignKey: 'type_id',
        })
    };

    event.prototype.toJSON = function () {
        const fields = [
            'type_id',
            'user_id',
        ]

        return _.omit(this.get(), fields)
    }

    return event;
};
