'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        // exampleField: DataTypes.STRING
    }, {
        underscored: true,
    });
    user.associate = function (models) {
        // associations can be defined here
    };
    return user;
};
