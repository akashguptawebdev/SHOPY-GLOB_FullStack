import { Cart } from '../Model/cartModel.js';
import {ProductModel as Product} from "../Model/ProductModel.js" // Assuming you have a Product model

// Add Item to Cart
export const addItemToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.id; //  user ID is available in req.id

  try {
    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    // If no cart exists, create one
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Find the product to get its price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found', success: false });
    }

    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

    if (itemIndex > -1) {
      // If item exists in cart, update quantity and total
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].total = cart.items[itemIndex].quantity * product.price;
    } else {
      // If item does not exist in cart, add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        total: quantity * product.price
      });
    }

    await cart.save();

    res.status(200).json({ message: 'Item added to cart', success: true, cart });
  } catch (err) {
    next(err);
  }
};

// Remove Item from Cart
export const removeItemFromCart = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found', success: false });
    }

    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json({ message: 'Item removed from cart', success: true, cart });
    } else {
      return res.status(404).json({ message: 'Item not found in cart', success: false });
    }

  } catch (err) {
    next(err);
  }
};

// Update Item Quantity in Cart
export const updateItemQuantity = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found', success: false });
    }

    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].total = quantity * cart.items[itemIndex].price;
      await cart.save();
      return res.status(200).json({ message: 'Cart updated', success: true, cart });
    } else {
      return res.status(404).json({ message: 'Item not found in cart', success: false });
    }
  } catch (err) {
    next(err);
  }
};

// Get Cart for User
export const getCart = async (req, res, next) => {
  const userId = req.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price'); // Populating product info
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found', success: false });
    }

    res.status(200).json({ message: 'Cart retrieved successfully', success: true, cart });
  } catch (err) {
    next(err);
  }
};

// Clear Cart
export const clearCart = async (req, res, next) => {
  const userId = req.id;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found', success: false });
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({ message: 'Cart cleared', success: true, cart });
  } catch (err) {
    next(err);
  }
};
