
module.exports = {
  development: {
    username: 'andelaeveloper',
    password: null,
    database: 'dataSystem2',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'andelaeveloper',
    password: null,
    database: 'testSystem',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'BACKUP_DATABASE'
  }
};
