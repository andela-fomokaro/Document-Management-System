import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { is: /\w+$/i },
    },
    fullNames: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: {
        args: true
      }
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Users.belongsTo(models.Roles, {
          onDelete: 'CASCADE',
          foreignKey: 'roleId'
        });
        Users.hasMany(models.Documents, {
          foreignKey: 'ownerId',
          as: 'Documents',
          onDelete: 'CASCADE'
        });
      }
    },
    instanceMethods: {
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
      }
    },
    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },
      beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return Users;
};
