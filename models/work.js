'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Work extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Work.belongsTo(models.Company),
                Work.belongsToMany(models.User, {
                    through: 'saveworks',
                }),
                Work.belongsToMany(models.User, {
                    through: 'workapplies',
                    as: 'workapply2',
                }),
                Work.belongsToMany(models.Tag, {
                    through: 'tagworks',
                }),
                Work.belongsToMany(models.TypeOfWork, {
                    through: 'worktypeofworks',
                }),
                Work.hasMany(models.TagWork, { foreignKey: 'workId', as: 'tagWork' }),
                Work.hasMany(models.WorkApply, { foreignKey: 'workId' }),
                Work.hasMany(models.WorkTypeOfWork, {
                    foreignKey: 'workId',
                    as: 'workType',
                });
        }
    }
    Work.init(
        {
            companyId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Company',
                    key: 'id',
                },
            },
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            addressGoogle: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            price1: DataTypes.INTEGER,
            price2: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            interest: DataTypes.STRING,
            dealtime: DataTypes.STRING,
            nature: DataTypes.STRING,
            exprience: DataTypes.STRING,
            description: DataTypes.STRING,
            form: DataTypes.STRING,
            status: DataTypes.INTEGER,
            censorship: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Work',
            tableName: 'works'
        },
    );
    return Work;
};
