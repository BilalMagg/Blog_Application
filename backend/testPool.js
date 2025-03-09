// Load environment variables from .env file
require('dotenv').config();

const { Pool } = require('pg');

// Create a new pool using the connection string from your .env file
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false, // Adjust this for stricter security if needed
  },
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
    process.exit(1);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      console.error('Error executing query', err.stack);
      process.exit(1);
    }
    console.log('Connection successful. Current time from DB:', result.rows[0]);
    process.exit();
  });
});
