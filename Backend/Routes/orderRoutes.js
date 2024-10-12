import express from 'express';
import {
  createOrderFromCart,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
  cancleOrder,
} from '../Controllers/orderController.js';
import { isAuthenticated, isAdmin } from '../MiddleWare/isAuthenticated.js';

const orderRoute = express.Router();

// Create a new order from the cart (requires authentication)
orderRoute.post('/create', isAuthenticated, createOrderFromCart);

// Get a specific order by ID (requires authentication)
orderRoute.get('/:id', isAuthenticated, getOrderById);

// Get all orders for the authenticated user
orderRoute.get('/user/orders', isAuthenticated, getUserOrders);

// Update the status of an order (admin only)
orderRoute.put('/:id/status', isAuthenticated, isAdmin, updateOrderStatus);

// Delete an order (admin only)
orderRoute.delete('/:id', isAuthenticated, isAdmin, deleteOrder);

orderRoute.put('/:id/cancel', isAuthenticated, cancleOrder )

export default orderRoute;
