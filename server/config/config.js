
module.exports = {
  development: {
    username: 'andelaeveloper',
    password: null,
    database: 'dataSystem2',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  // test: {
  //   username: 'andelaeveloper',
  //   password: null,
  //   database: 'testSystem',
  //   host: '127.0.0.1',
  //   dialect: 'postgres',
  //   logging: false
  // },
  test: {
    use_env_variable: 'DATABASE_TEST_URL',
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'BACKUP_DATABASE'
  }
};
