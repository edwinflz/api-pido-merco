module.exports = (sequelize, DataTypes) => {
  const Departament = sequelize.define(
    'Departament',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  Departament.associate = function (models) {
    Departament.hasMany(models.Municipality, {
      foreignKey: 'departamentId',
    });
  };
  return Departament;
};
