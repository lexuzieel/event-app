'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
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
    return user;
};
