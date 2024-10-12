import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/Redux/productSlice/CartSlice";

const AddToCart = ({
  item,
  paddingY = "1",
  paddingX = "4",
  Bgcolor = "bg-red-500",
  text = "Cart",
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  // Check if the item is already in the cart
  const isInCart = cartItems.some((cartItem) => cartItem._id === item._id);

  const handleAddBook = () => {
    if (!isInCart) {
      dispatch(addItem(item));
    }
  };

  return (
    <button
      className={`border ${Bgcolor} ${isInCart ? "bg-white text-black " : "text-white"} w-full py-${paddingY} px-${paddingX} rounded-md text-sm font-semibold `}
      onClick={handleAddBook}
      disabled={isInCart} // Disables the button if the item is already in the cart
    >
      {isInCart ? "In Cart" : text}
    </button>
  );
};

export default AddToCart;
