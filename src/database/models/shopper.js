module.exports = (sequelize, DataTypes) => {
  const Shopper = sequelize.define(
    'Shopper',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      municipalityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      domicile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      domicileTwo: DataTypes.STRING,
      domicileThree: DataTypes.STRING,
      imgProfile: DataTypes.STRING,
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
      timestamps: true,
    }
  );
  Shopper.associate = function (models) {
    Shopper.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Shopper.belongsTo(models.Municipality, {
      foreignKey: 'municipalityId',
      as: 'municipality'
    });
    Shopper.hasMany(models.Order, {
      foreignKey: 'shopperId',
    });
  };
  return Shopper;
};
