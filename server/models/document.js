module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: { type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: DataTypes.TEXT,
    access: { type: DataTypes.TEXT, defaultValue: 'public' },
    ownerId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        Documents.belongsTo(models.Users, {
          onDelete: 'CASCADE',
          foreignKey: 'ownerId'
        });
      }
    }
  });
  return Documents;
};
