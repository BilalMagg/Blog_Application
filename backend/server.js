const { sequelize } = require('./models');
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/posts');

// Set up express middlewares
app.use(express.json());
app.use(cors());

// Test root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Use post routes
app.use('/posts', postRoutes);

// Sync Sequelize models
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync({ force: false }); // Change to true if you want to recreate tables on each restart
  })
  .then(() => {
    console.log('The tables have been successfully created.');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error during database synchronization:', err);
    process.exit(1); // Exit if database sync fails
  });

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Gracefully shutting down...');
  sequelize.close().then(() => {
    console.log('Sequelize connection closed');
    process.exit(0);
  }).catch(err => {
    console.error('Error closing Sequelize connection:', err);
    process.exit(1);
  });
});
