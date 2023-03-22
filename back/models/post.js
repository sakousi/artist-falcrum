'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {      
      // define association here
        Post.belongsTo(models.User, {allowNull: false});
        Post.hasMany(models.Comment, {allowNull: false});
        Post.hasMany(models.Like);
        Post.hasMany(models.Category);
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    media: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};