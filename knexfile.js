require('dotenv').config()

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/devdesk.db3'
    },
    migration: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  testing: {
    useNullAsDefault: true,
    connection: {
      filename: './data/test.db3'
    },
    migration: {
      directory: './data/migrations'
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
      directory: './data/seeds'
    }
  },
  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      connectionString: process.env.DATABASE_URL
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};