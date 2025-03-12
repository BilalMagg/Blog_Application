const { sequelize } = require('./models');
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const commentRoutes = require('./routes/comments');
const voteRoutes = require('./routes/votes');

const contentSanitizer = require('./middlewares/sanitation');
const passwordValidator = require('./middlewares/verifyPWT');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/votes',voteRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync({ force: false }); 
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
    process.exit(1); 
  });

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
