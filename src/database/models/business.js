module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define(
    'Business',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      municipalityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brandId: DataTypes.INTEGER,
      nit: DataTypes.STRING(50),
      nameBusiness: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      phone: { type: DataTypes.STRING(20), allowNull: false },
      email: DataTypes.STRING(191),
      cash: DataTypes.INTEGER,
      dataphone: DataTypes.INTEGER,
      ally: { type: DataTypes.INTEGER, allowNull: false },
      photo: { type: DataTypes.STRING, allowNull: false },
      photoTwo: DataTypes.STRING,
      photoThree: DataTypes.STRING,
      photoFour: DataTypes.STRING,
      photoFive: DataTypes.STRING,
      rut: { type: DataTypes.STRING, llowNull: false },
      documentId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      documentCommerce: DataTypes.STRING,
      status: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      timestamps: true,
    }
  );
  Business.associate = function (models) {
    Business.belongsTo(models.Municipality, {
      foreignKey: 'municipalityId',
    });
    Business.belongsTo(models.Brand, {
      foreignKey: 'brandId',
    });
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Business.hasMany(models.Offer, {
      foreignKey: 'businessId',
    });
    Business.belongsToMany(models.Employee, {
      through: 'BusinessEmployee',
      as: 'employees',
    });
    Business.belongsToMany(models.Subcategory, {
      through: 'BusinessSubcategory',
      as: 'subcategories',
    });
  };
  return Business;
};
