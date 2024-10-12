import { Order } from '../Model/orderModel.js';
import { Cart } from '../Model/cartModel.js';
import mongoose from 'mongoose';

export const createOrderFromCart = async (req, res, next) => {
  try {
    const userId = req.id;

    // Fetch the user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty. Cannot place an order.",
      });
    } 

    // Calculate total price
    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);

    // Create a new order
    const order = new Order({
      user: userId,
      orderItems: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      
      shippingAddress: req.body.shippingAddress, // Assume shippingAddress is provided in the request body
      paymentMethod: req.body.paymentMethod, // Assume paymentMethod is provided in the request body
      totalPrice: totalPrice,
      paymentStatus: 'Pending', // Start with 'Pending', update when payment is confirmed
    });

    // Save the order
    await order.save();

    // Clear the user's cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Order successfully created',
      order,
    });
  } catch (error) {
    next(error);
  }
};


export const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('user', 'username email').populate('orderItems.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};


export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.id;
    const orders = await Order.find({ user: userId }).populate('orderItems.product');

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this user',
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};


export const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { orderStatus } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.orderStatus = orderStatus;

    if (orderStatus === 'Delivered') {
      order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    await order.remove();

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Cancel an order (only for the user who placed the order)
export const cancleOrder = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const userId = req.id;
  
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
  
      // Ensure the user is the owner of the order
      if (order.user.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to cancel this order',
        });
      }
  
      // Check if the order can still be canceled (e.g., it hasn't been shipped yet)
      if (order.orderStatus !== 'Processing') {
        return res.status(400).json({
          success: false,
          message: 'This order cannot be canceled at this stage',
        });
      }
  
      // Update the order status to "Cancelled"
      order.orderStatus = 'Cancelled';
      await order.save();
  
      res.status(200).json({
        success: true,
        message: 'Order successfully canceled',
        order,
      });
    } catch (error) {
      next(error);
    }
  }
  
