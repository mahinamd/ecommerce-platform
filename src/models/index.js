const sequelize = require('../config/database');
const Order = require('./order');
const Inventory = require('./inventory');

const syncModels = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  sequelize,
  Order,
  Inventory,
  syncModels,
};
