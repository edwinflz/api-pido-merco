module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define(
    'OrderDetail',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
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
  OrderDetail.associate = function (models) {
    OrderDetail.belongsTo(models.Order, {
      foreignKey: 'orderId',
    });
  };
  return OrderDetail;
};
