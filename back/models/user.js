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
    }
  };
  User.init({
    pseudo: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
          len: { args: [11,11], msg: 'Phone Number is invalid' },
          isInt: { args: true, msg: "You must enter Phone Number" },
        }
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { args: true, msg: "You must enter Password" },
            len: { args: [8,20], msg: 'Password must be between 8 and 20 characters' },
        }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};