module.exports = (sequelize, DataTypes) => {
  const Municipality = sequelize.define(
    'Municipality',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      departamentId: { type: DataTypes.INTEGER, allowNull: false },
      nameMunicipality: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      status: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
  Municipality.associate = function (models) {
    Municipality.belongsTo(models.Departament, {
      foreignKey: 'departamentId',
    });
  };
  return Municipality;
};
