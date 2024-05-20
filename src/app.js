const express = require('express');
const dotenv = require('dotenv');
const { syncModels } = require('./models');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(orderRoutes);

const PORT = process.env.PORT || 3002; // Change 3000 to a different port number



syncModels().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to sync database:', error);
});
