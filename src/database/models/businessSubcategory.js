module.exports = (sequelize, DataTypes) => {
  const BusinessSubcategory = sequelize.define(
    'BusinessSubcategory',
    {
      status: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
  return BusinessSubcategory;
};
