module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    'Employee',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
  Employee.associate = function (models) {
    Employee.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Employee.belongsToMany(models.Business, {
      through: 'BusinessEmployee',
      as: 'business'
    });
  };
  return Employee;
};
