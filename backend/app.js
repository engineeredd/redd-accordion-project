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

app.listen(PORT, () => {
	sequelize.sync(); // Ensure database is synced
  console.log(`Server is running on port ${PORT}`);
});
