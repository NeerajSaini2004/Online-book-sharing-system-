const Order = require('../models/Order');
const Listing = require('../models/Listing');

exports.createOrder = async (req, res) => {
  try {
    const listing = await Listing.findById(req.body.listing);
    if (!listing) return res.status(404).json({ success: false, message: 'Listing not found' });
    
    const order = await Order.create({
      ...req.body,
      buyer: req.user._id,
      seller: listing.seller
    });
    
    await order.populate('listing buyer seller', 'title name email');
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate('listing', 'title images price')
      .populate('seller', 'name email')
      .sort('-createdAt');
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMySales = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user._id })
      .populate('listing', 'title images price')
      .populate('buyer', 'name email')
      .sort('-createdAt');
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, seller: req.user._id },
      { orderStatus: req.body.status, trackingInfo: req.body.trackingInfo },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
