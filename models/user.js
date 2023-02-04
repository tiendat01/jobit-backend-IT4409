'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            User.belongsToMany(models.Work, {
                through: "saveworks"
            }),
                User.belongsToMany(models.Company, {
                    through: "recruitments"
                }),
                User.belongsToMany(models.Work, {
                    through: "workapplies",
                    as: "workapply"
                })
            User.belongsToMany(models.TypeOfWork, {
                through: "usertypeofworks"
            }),
                User.belongsToMany(models.Tag, {
                    through: "usertags"
                }),

                User.hasMany(models.NotificationUser),
                User.hasOne(models.Candidate),
                User.hasMany(models.UserTag)
        }
    };
    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        male: DataTypes.STRING,
        avatar: DataTypes.STRING,
        date: DataTypes.STRING,
        introduce: DataTypes.TEXT,
        banner: DataTypes.STRING(500),
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users'
    });
    return User;
};