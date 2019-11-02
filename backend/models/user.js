'use strict';

const _ = require('lodash')

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        profileId: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        profileUrl: {
            type: DataTypes.STRING
        },
        avatarUrl: {
            type: DataTypes.STRING
        },
    }, {
        underscored: true,
    });

    user.associate = function (models) {
        // associations can be defined here
    };

    user.prototype.toJSON = function () {
        const fields = [
            'profileId',
        ]

        return _.omit(this.get(), fields)
    }

    return user;
};
