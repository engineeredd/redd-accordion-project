const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const externalSystemRoutes = require('./routes/externalSystemRoutes');
const plannerRoutes = require('./routes/plannerRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/external-systems', externalSystemRoutes);
app.use('/api/planners', plannerRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
