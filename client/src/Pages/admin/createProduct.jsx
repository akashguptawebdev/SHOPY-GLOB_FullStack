import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseApiUrl } from "../../utils/BaseURL";
import { Box, CircularProgress } from "@mui/material";
import NavigateBack from "../../Components/NavigateBack";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(""); // Will hold the _id of the selected category
  const [description, setDescription] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [warrantyInformation, setWarrantyInformation] = useState("");
  const [shippingInformation, setShippingInformation] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [image, setImage] = useState(null);
  const [reviews, setReviews] = useState([
    { reviewerName: "", reviewerEmail: "", rating: "", comment: "" },
  ]);
  const [loding, setLoding] = useState(false);

  const [fetchCategory, setFetchCategory] = useState([]); // Holds the fetched categories from the API

  // Handle Review Change
  const handleReviewChange = (index, e) => {
    const newReviews = [...reviews];
    newReviews[index][e.target.name] = e.target.value;
    setReviews(newReviews);
  };

  // Set final price when price or discount changes
  useEffect(() => {
    const handleSetFinalPrice = () => {
      if (price || discountPercentage) {
        const calculatedPrice = price - (price * discountPercentage) / 100;
        setFinalPrice(calculatedPrice.toFixed(2)); // Limiting to 2 decimal places
      } else {
        setFinalPrice(price); // If no discount, final price equals the original price
      }
    };
    handleSetFinalPrice();
  }, [price, discountPercentage]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const url = "http://localhost:2850/api/v1/category/getallcategory";
        const response = await axios.get(url, { withCredentials: true });
        setFetchCategory(response.data.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);

  // Handle Image Upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  // Handle Category Change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // Set the selected category's _id
    console.log(category);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title,
      price,
      finalPrice,
      discountPercentage,
      rating,
      stock,
      brand,
      category, // Sending the selected category _id
      description,
      returnPolicy,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      reviews: JSON.stringify(reviews), // Converting reviews array to string
      images: image, // This will handle the uploaded image
    };
    

    if (
      !title ||
      !price ||
      !finalPrice ||
      !discountPercentage ||
      !rating ||
      !stock ||
      !category ||
      !description ||
      !returnPolicy ||
      !warrantyInformation ||
      !shippingInformation ||
      !availabilityStatus ||
      !image
    ) {
      return toast.error("All fields required");
    }

    setLoding(true);

    try {
      const response = await axios.post(
        `${baseApiUrl}/api/v1/product/createProduct`,
        productData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success("Product added successfully!");
      if (response) {
        setLoding(false);

        ClearField();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error adding product!");
      setLoding(false);
    }
  };

  const ClearField = () => {
    setTitle("");
    setPrice("");
    setFinalPrice("");
    setDiscountPercentage("");
    setRating("");
    setStock("");
    setBrand("");
    setCategory("");
    setDescription("");
    setReturnPolicy("");
    setWarrantyInformation("");
    setShippingInformation("");
    setAvailabilityStatus("");
    setImage(null);
    setReviews([]);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg mt-10">
        <span className="">
        <NavigateBack />
      </span>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Add New Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-1">
            <label className="block text-gray-700">Product Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter product title"
              required
            />
          </div>

          {/* Price */}
          <div className="col-span-1">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter product price"
              required
            />
          </div>

          {/* Discount Percentage */}
          <div className="col-span-1">
            <label className="block text-gray-700">Discount Percentage</label>
            <input
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter discount percentage"
            />
          </div>

          {/* Final Price */}
          <div className="col-span-1">
            <label className="block text-gray-700">Final Price</label>
            <input
              type="number"
              value={finalPrice}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Final price will be auto-calculated"
            />
          </div>

          {/* Rating */}
          <div className="col-span-1">
            <label className="block text-gray-700">Rating</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter product rating"
            />
          </div>

          {/* Stock */}
          <div className="col-span-1">
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter available stock"
            />
          </div>

          {/* Brand */}
          <div className="col-span-1">
            <label className="block text-gray-700">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter brand"
            />
          </div>

          {/* Category */}
          <div className="col-span-1">
            <label className="block text-gray-700">Category</label>
            <select
              value={category}
              onChange={handleCategoryChange} // Handle category change
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Category</option>
              {fetchCategory?.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="col-span-1">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter product description"
            />
          </div>

          {/* Return Policy */}
          <div className="col-span-1">
            <label className="block text-gray-700">Return Policy</label>
            <input
              type="text"
              value={returnPolicy}
              onChange={(e) => setReturnPolicy(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter return policy"
            />
          </div>

          {/* Warranty Information */}
          <div className="col-span-1">
            <label className="block text-gray-700">Warranty Information</label>
            <input
              type="text"
              value={warrantyInformation}
              onChange={(e) => setWarrantyInformation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter warranty information"
            />
          </div>

          {/* Shipping Information */}
          <div className="col-span-1">
            <label className="block text-gray-700">Shipping Information</label>
            <input
              type="text"
              value={shippingInformation}
              onChange={(e) => setShippingInformation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter shipping information"
            />
          </div>

          {/* Availability Status */}
          <div className="col-span-1">
            <label className="block text-gray-700">Availability Status</label>
            <select
              value={availabilityStatus}
              onChange={(e) => setAvailabilityStatus(e.target.value)} // Handle category change
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>

            </select>
          </div>

          {/* Image Upload */}
          <div className="col-span-1">
            <label className="block text-gray-700">Product Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              accept="image/*"
            />
          </div>

          {/* Reviews */}
          {reviews.map((review, index) => (
            <div key={index} className="col-span-2">
              <h3 className="text-xl font-semibold">Review {index + 1}</h3>
              <input
                type="text"
                name="reviewerName"
                value={review.reviewerName}
                onChange={(e) => handleReviewChange(index, e)}
                placeholder="Reviewer Name"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                name="reviewerEmail"
                value={review.reviewerEmail}
                onChange={(e) => handleReviewChange(index, e)}
                placeholder="Reviewer Email"
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
              <input
                type="number"
                name="rating"
                value={review.rating}
                onChange={(e) => handleReviewChange(index, e)}
                placeholder="Rating"
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
              <textarea
                name="comment"
                value={review.comment}
                onChange={(e) => handleReviewChange(index, e)}
                placeholder="Comment"
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            className={` ${
              loding ? "" : "bg-blue-500 text-white hover:bg-blue-700"
            }    font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full`}
            type="submit"
          >
            {loding ? (
              <Box>
                <CircularProgress />
              </Box>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
