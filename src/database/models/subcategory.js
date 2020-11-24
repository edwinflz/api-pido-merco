module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define(
    'Subcategory',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
      nameSubCategory: { type: DataTypes.STRING(50), allowNull: false },
      description: DataTypes.STRING,
      slug: { type: DataTypes.STRING(191), unique: true, allowNull: false },
      img: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
  Subcategory.associate = function (models) {
    Subcategory.belongsTo(models.Category, {
      foreignKey: 'categoryId',
    });
    Subcategory.belongsToMany(models.Business, {
      through: 'BusinessSubCategory',
      as: 'business',
    });
  };
  return Subcategory;
};
