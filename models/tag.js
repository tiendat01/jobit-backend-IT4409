'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            Tag.belongsToMany(models.Candidate, {
                through: "tagcandidates"
            }),
                Tag.belongsToMany(models.Work, {
                    through: "tagworks"
                })
            Tag.belongsToMany(models.User, {
                through: "usertags"
            }),
                Tag.belongsToMany(models.FormCV, {
                    through: "tagformcvs"
                })
        }
    };
    Tag.init({
        name: DataTypes.STRING,
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Tag',
        tableName: 'tags'
    });
    return Tag;
};