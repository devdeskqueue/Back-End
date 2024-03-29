require('dotenv').config()

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/devdesk.db3'
    },
    migrations:{
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/development/seeds'
    },
    debug: true
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/test.db3'
    },
    migrations:{
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/testing'
    }
  },
  staging: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      connectionString: process.env.STAGING_DB_URL,
      ssl: true
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/staging'
    },
    debug: true
  },
  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/production'
    }
  }

};
