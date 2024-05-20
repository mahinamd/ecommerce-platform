const { placeOrder } = require('../services/orderService');

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const order = await placeOrder(items);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
};
