module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    'Brand',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false },
    },
    {
      timestamps: false,
    }
  );
  Brand.associate = function (models) {
    Brand.hasMany(models.Business, {
      foreignKey: 'brandId',
    });
  };
  return Brand;
};
