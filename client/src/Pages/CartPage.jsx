import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  decreaseQuantity,
  removeItem,
} from "../utils/Redux/productSlice/CartSlice";
import NavigateBack from "../Components/NavigateBack";

const CartPage = () => {
  const cartItem = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to handle adding a product to the cart
  const handleAddBook = (item) => {
    dispatch(addItem(item));
  };

  // Function to handle removing a product from the cart
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };
  // Function to handle Decrease Quanity from the cart
  const HandleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  // Function to calculate subtotal and total price including shipping if necessary
  const calculateSubtotal = () => {
    const subtotal = cartItem?.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    setPrice(Math.floor(subtotal));

    // Add shipping cost if subtotal is less than 350
    if (subtotal < 120 && cartItem?.length !== 0) {
      setTotalPrice(Math.floor(subtotal + 17));
    } else {
      setTotalPrice(Math.floor(subtotal));
    }
  };

  // Effect hook to recalculate prices when cart items change
  useEffect(() => {
    calculateSubtotal();
  }, [cartItem]);

  return (
    <>
      <div className="container mx-auto  px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="py-4">
          <NavigateBack />
        </div>
        <h1 className="text-2xl font-bold mb-10">Cart Items</h1>

        {/* Cart Items List */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2">
            {cartItem?.map((item) => (
              <div
                key={item._id}
                className="bg-white  shadow-md rounded-lg p-6 mb-6"
              >
                <div className="flex  sm:flex-row sm:justify-between gap-4">
                  <div>
                    <img
                      src={item?.images[0].url}
                      alt="product-image"
                      className="w-full sm:w-40 rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between w-full">
                    {/* Remove Item Button */}
                    <button
                        className="text-red-500 flex justify-end hover:text-red-700 transition"
                        onClick={() => handleRemove(item._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h2>
                    </div>
                    <div className="flex items-center justify-between mt-4 sm:mt-0">
                      {/* Quantity Adjuster */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          className="text-black bg-gray-100 font-bold py-1 px-3.5 rounded-l hover:bg-blue-500 hover:text-white transition"
                          onClick={() => HandleDecreaseQuantity(item._id)}
                        >
                          -
                        </button>
                        <input
                          className="h-8 w-8 text-center border-l border-r border-gray-300 outline-none"
                          type="number"
                          value={item.quantity}
                          min={1}
                          readOnly
                        />
                        <button
                          className="text-white bg-blue-500 font-bold py-1 px-3.5 rounded-r hover:bg-blue-600 transition"
                          onClick={() => handleAddBook(item)}
                        >
                          +
                        </button>
                      </div>
                      
                    </div>
                    <div className="mt-4">
                      <p className="font-bold text-base text-gray-900">
                        ${item.price}
                      </p>
                      {item.price && (
                        <p className="text-sm text-gray-500 line-through">
                          $
                          {Math.floor(
                            item.price + (item.price % item.discountPercentage)
                          )}
                        </p>
                      )}
                      <p className="text-sm text-green-500">
                        {item.discountPercentage}% off
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6 h-full">
            <div className="mb-4">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${price}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">
                {cartItem.length !== 0 && price < 350 ? "$17" : "Free"}
              </p>
            </div>
            <hr className="my-4" />
            <div className="mb-4">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">${totalPrice}</p>
            </div>
            <button className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition">
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
