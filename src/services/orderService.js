const { sequelize, Order, Inventory } = require('../models');

const placeOrder = async (items) => {
  return sequelize.transaction(async (t) => {
    const order = await Order.create({ items }, { transaction: t });

    for (const item of items) {
      const inventoryItem = await Inventory.findOne({ where: { item: item.name } });

      if (!inventoryItem || inventoryItem.quantity < item.quantity) {
        throw new Error(`Insufficient inventory for item: ${item.name}`);
      }

      inventoryItem.quantity -= item.quantity;
      await inventoryItem.save({ transaction: t });
    }

    return order;
  });
};

module.exports = {
  placeOrder,
};
