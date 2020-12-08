const { Model } = require('sequelize');
const { genSaltSync, hashSync } = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Employee, {
        foreignKey: 'userId',
      });
      User.hasOne(models.Shopper, {
        foreignKey: 'userId',
        as: 'shopper'
      });
      User.hasOne(models.Business, {
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING(191), unique: true, allowNull: false },
      password: DataTypes.STRING,
      status: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      hooks: {
        beforeCreate: (user) => {
          const salt = genSaltSync();
          user.password = hashSync(user.password, salt);
        },
      },
    }
  );
  return User;
};
