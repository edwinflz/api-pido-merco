module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nameCategory: { type: DataTypes.STRING(50), allowNull: false },
      description: DataTypes.STRING,
      slug: { type: DataTypes.STRING(191), unique: true, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
  Category.associate = function (models) {
    Category.hasMany(models.Subcategory, {
      as: 'subCategories',
      foreignKey: 'categoryId',
    });
  };
  return Category;
};
