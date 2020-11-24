module.exports = (sequelize, DataTypes) => {
  const OfferDetail = sequelize.define(
    'OfferDetail',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      offerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product: { type: DataTypes.STRING, allowNull: false },
      brand: DataTypes.STRING,
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      measure: DataTypes.STRING,
      price: { type: DataTypes.INTEGER, allowNull: false },
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
    }
  );
  OfferDetail.associate = function (models) {
    OfferDetail.belongsTo(models.Offer, {
      foreignKey: 'offerId',
    });
  };
  return OfferDetail;
};
