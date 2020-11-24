module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      shopperId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateIn: { type: DataTypes.DATE, allowNull: false },
      dateOut: DataTypes.DATE,
      comment: DataTypes.STRING,
      bussinessId: DataTypes.INTEGER,
      cash: DataTypes.INTEGER,
      dataphone: DataTypes.INTEGER,
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
  Order.associate = function (models) {
    Order.belongsTo(models.Shopper, {
      foreignKey: 'shopperId',
    });
    Order.belongsTo(models.Subcategory, {
      foreignKey: 'subcategoryId',
    });
    Order.hasMany(models.Offer, {
      foreignKey: 'orderId',
    });
    Order.hasMany(models.OrderDetail, {
      foreignKey: 'orderId',
    });
  };
  return Order;
};
