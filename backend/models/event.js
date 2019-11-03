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
        location: {
            get() {
                return JSON.parse(this.getDataValue('location'))
            },
            validate: {
                location: value => {
                    if (validator.isJSON(value)) {
                        let location = JSON.parse(value)
                        if (!location.lon || !location.lat) {
                            throw new Error('Location must be have both "long" and "lat" properties')
                        }
                    } else {
                        throw new Error('Location must be JSON')
                    }
                },
            },
            type: DataTypes.STRING
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
