module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: { type: DataTypes.STRING,
      allowNull: false,
    },
    content: DataTypes.TEXT,
    access: { type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: {
        isIn: [['private', 'public', 'role']],
      } },
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate(models) {
        Documents.belongsTo(models.Users, {
          onDelete: 'CASCADE',
          foreignKey: 'ownerId',
        });
      },
    },
  });
  return Documents;
};
