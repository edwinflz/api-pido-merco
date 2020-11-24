module.exports = (sequelize, DataTypes) => {
  const BusinessEmployee = sequelize.define(
    'BusinessEmployee',
    {
      dateIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dateOut: DataTypes.DATE,
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
  return BusinessEmployee;
};
