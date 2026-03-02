const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    console.log('Creating order with:', req.body);
    console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);
    
    const { amount, bookTitle } = req.body;
    
    if (!amount || !bookTitle) {
      return res.status(400).json({ 
        success: false, 
        message: 'Amount and bookTitle are required' 
      });
    }
    
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        bookTitle,
        userId: req.user?._id || 'guest'
      }
    };

    const order = await razorpay.orders.create(options);
    console.log('Order created:', order);
    res.json({ success: true, order });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderData
    } = req.body;
    
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      const estimatedDeliveryDate = new Date();
      estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);

      const order = new Order({
        ...orderData,
        buyerId: req.user._id,
        paymentStatus: 'Paid',
        deliveryStatus: 'Pending',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        estimatedDeliveryDate
      });

      await order.save();

      res.json({ 
        success: true, 
        message: 'Payment verified and order created successfully',
        order 
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
