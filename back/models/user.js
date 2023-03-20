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
      // define association here
      User.hasMany(models.Post, {allowNull: false});
      User.hasMany(models.Comment, {allowNull: false});
      User.hasMany(models.Like, {allowNull: false});
      User.hasMany(models.Category, {allowNull: false});
      User.hasMany(models.UserBadge, {allowNull: false});
    }
  };
  User.init({
    pseudo: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Must be a valid email address'
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "You must enter Phone Number" },
          len: { args: [10, 10], msg: 'Phone Number is invalid' },
          isInt: { args: true, msg: "You must enter Phone Number" },
        }
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { args: true, msg: "You must enter Password" }
        }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};