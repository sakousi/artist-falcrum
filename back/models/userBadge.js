'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserBadge extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserBadge.belongsTo(models.User, {allowNull: false});
            UserBadge.belongsTo(models.Badge, {allowNull: false});
        }
    };
    UserBadge.init({
        createdAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'UserBadge',
    });
    return UserBadge;
}