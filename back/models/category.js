'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Post, {allowNull: false});
            Category.hasMany(models.User, {allowNull: false});
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