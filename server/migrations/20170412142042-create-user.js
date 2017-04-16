  module.exports = {
    up(queryInterface, Sequelize) {
      return queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        username: {
          type: Sequelize.STRING
        },
        fullNames: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING,
          validate: { isEmail: true }
        },
        password: {
          type: Sequelize.STRING
        },
        roleId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Roles',
            key: 'id',
            as: 'roleId'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    },
    down(queryInterface, Sequelize) {
      return queryInterface.dropTable('users');
    }
  };
