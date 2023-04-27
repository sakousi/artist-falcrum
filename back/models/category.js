'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.belongsToMany(models.Post, {through: 'postHasCategory', allowNull: false});
            Category.belongsToMany(models.User, {through: 'userHasCategory', allowNull: false});
        }
    }
    Category.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Category',
    })
    return Category
}