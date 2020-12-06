const Sequelize = require('sequelize');
const op = Sequelize.Op;
module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define(
    'Offer',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateIn: { type: DataTypes.DATE, allowNull: false },
      dateOut: DataTypes.DATE,
      visibilityPrice: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      comment: DataTypes.STRING,
      total: { type: DataTypes.INTEGER, allowNull: false },
      qualification: DataTypes.INTEGER,
      observation: DataTypes.STRING,
      status: { type: DataTypes.INTEGER, allowNull: false },
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
      scopes: {
        actives: {
          where: {
            status: {[op.ne]: 0}
          }
        },
      }
    }
  );
  Offer.associate = function (models) {
    Offer.belongsTo(models.Order, {
      foreignKey: 'orderId',
      as: 'order'
    });
    Offer.belongsTo(models.Business, {
      foreignKey: 'businessId',
      as: 'business'
    });
    Offer.hasMany(models.OfferDetail, {
      foreignKey: 'offerId',
    });
  };
  return Offer;
};
