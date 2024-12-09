/** @format */

const Order = require("./order.model");

const createAnOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log("Error creating order!", err.message);
    res.status(500).json({ message: "Failed to place the order!", ...err });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    if (!orders) {
      return res.status(404).json({ message: "Orders not found!" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.log("Error fetching orders!", err.message);
    res.status(500).json({ message: "Failed to place the order!", ...err });
  }
};

module.exports = { createAnOrder, getOrderByEmail };
