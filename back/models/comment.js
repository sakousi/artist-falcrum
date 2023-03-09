'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {      
      // define association here
        Comment.belongsTo(models.User, {allowNull: false});
        Comment.belongsTo(models.Post, {allowNull: false});
        Comment.belongsTo(models.Comment, {allowNull: true});
        Comment.hasMany(models.Comment, {allowNull: true});
        Comment.hasMany(models.Like, {allowNull: true});
    }
  };
  Comment.init({
    content: DataTypes.STRING,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};