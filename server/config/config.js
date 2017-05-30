
module.exports = {
  development: {
    // use_env_variable: 'DATABASE_URL',
    username: 'andelaeveloper',
    password: null,
    database: 'dataSystem2',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'DATABASE_TEST_URL',
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'BACKUP_DATABASE'
  }
};
