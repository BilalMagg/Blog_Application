require('dotenv').config(); // Load environment variables

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    use_env_variable: process.env.DB_URL,
    dialect: "postgres",
    dialectOptions: {
      // Neon may require SSL connections.
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
};
