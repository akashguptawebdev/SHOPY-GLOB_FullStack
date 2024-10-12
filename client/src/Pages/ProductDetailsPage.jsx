import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AddToCart from "../Components/AddToCart";
import NavigateBack from "../Components/NavigateBack";
import Loading from "../Components/Loading";

const ProductDetailsPage = () => {
  // Get the product ID from the URL using useParams
  const { id } = useParams();
  // Access product data from Redux store
  const data = useSelector((store) => store.Product.products);

  // State to store the filtered product details based on the product ID
  const [filterproduct, setfilterproduct] = useState(null);
  const [review , setReview] = useState([]); 
  useEffect(() => {
    if (data.length > 0) {
      // Find the product that matches the ID from the params and convert the ID to an integer
      const foundBook = data.find((item) => item._id == id);

      setfilterproduct(foundBook || null);
      setReview(JSON.parse(foundBook.reviews));
    }

    
  }, [data, id]);

  
  // Component to display the star rating for the product
  const StarRating = ({ rating }) => {
    const maxStars = 5;
    const filledStars = "★".repeat(Math.floor(rating));
    const emptyStars = "☆".repeat(maxStars - Math.floor(rating));

    return (
      <div className="text-yellow-500">
        <span>{filledStars}</span>
        <span>{emptyStars}</span>
      </div>
    );
  };

  // Show loading spinner if product details are not yet available
  if (!filterproduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {/* Navigation Back Button */}
      <span className="">
        <NavigateBack />
      </span>

      <div className="detailSection grid grid-cols-1 gap-4 sm:grid-cols-2 overflow-auto pt-6">
        {/* Left section: Product image and add to cart buttons */}
        <div className=" ">
          <div className="flex flex-col  sm:flex-row items-center sm:items-start ">
            {/* Product Image */}
            <div className="w-full bg-white">
              <div className="flex justify-center items-center">
                <img
                  src={filterproduct?.images[0].url}
                  alt="Book Cover"
                  className="w-full rounded-lg sm:w-80"
                />
              </div>

              {/* Add to Cart and Buy Now buttons for larger screens */}
              <div className="hidden  sm:block w-full ">
                <div className="flex">
                  <div className="w-full">
                    <Link to="/CartPage">
                      <AddToCart
                        item={filterproduct}
                        Bgcolor="bg-yellow-400"
                        text="Buy Now"
                        paddingY="4"
                        paddingX
                      />
                    </Link>
                  </div>
                  <div className="w-full">
                    <AddToCart item={filterproduct} paddingY="4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right section: Product details */}
        <div className="w-full">
          <div className="w-full px-4 bg-white">
            {/* Product title and brand */}
            <p className="text-sm text-blue-500 font-extrabold">
              View more from {filterproduct?.brand || filterproduct.title}
            </p>

            {/* Product description */}
            <div className="mt-4">
              <p className="text-xs text-slate-500">
                <strong className="text-black">
                  {filterproduct.brand || filterproduct.title}
                </strong>{" "}
                {filterproduct.description}
              </p>
            </div>

            {/* Product rating */}
            <div className="flex items-center mt-2 gap-2">
              <StarRating rating={filterproduct.rating} />
              <span className="text-sm text-blue-500">
                {filterproduct?.rating} ratings
              </span>
            </div>
          </div>

          {/* Product pricing and discount details */}
          <div className="offers flex gap-4 items-center py-2">
            <p className="text-green-600 font-extrabold text-lg">
              {filterproduct.discountPercentage}% off{" "}
            </p>
            <span className="line-through text-slate-400">
              {Math.floor(
                filterproduct.price +
                  (filterproduct.price % filterproduct.discountPercentage)
              )}
            </span>
            <span>${filterproduct.price}</span>
          </div>

          {/* Shipping information */}
          <div>
            <p className="text-xs  font-serif">
              {filterproduct.shippingInformation}
            </p>
          </div>

          {/* Product availability */}
          <p
            className={`${
              filterproduct.availabilityStatus === "In Stock"
                ? " text-green-600"
                : "text-red-300"
            } mt-4 border inline-block px-2 shadow-md font-semibold`}
          >
            {filterproduct.availabilityStatus}{" "}
            <span className="text-slate-400">{filterproduct.stock}</span>
          </p>

          {/* Warranty details */}
          <div className="flex bg-white mt-4 justify-evenly items-center">
            <h1 className="text-slate-400">Services</h1>
            <div className="w-12">
              <img src={filterproduct.thumbnail} alt="" />
            </div>
            <div>
              <p className="font-mono">{filterproduct.warrantyInformation}</p>
            </div>
          </div>

          {/* Ratings & Reviews Section */}
          <section className="Ratings & Reviews mb-20 mt-4 px-4 bg-white text-black">
            <h1 className="font-extrabold">Ratings & Reviews</h1>
            <div>
              {review?.map((item , index) => {
                return (
                  <div className="mb-8" key={index}>
                    <hr />
                    <div className="flex items-center mt-2 gap-2">
                      <StarRating rating={item.rating} />
                      <span className="text-sm text-slate-400">
                        <span className="text-slate-600">
                          {item.rating > 4 && " Must buy!"}
                        </span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">
                      Review for {filterproduct.title}
                    </p>

                    <p className="text-xs text-slate-600 mt-2">
                      <span className="text-slate-400">Comment:</span>{" "}
                      {item.comment}
                    </p>

                    <div className="mt-10">
                      <p className="text-xs">
                        <span className="text-slate-400">Name: </span>{" "}
                        {item.reviewerName}
                      </p>
                      <p className="text-xs">
                        <span className="text-slate-400">Email: </span>{" "}
                        {item.reviewerEmail}
                      </p>
                    </div>
                 
                  </div>
                );
              })}
            </div>
          </section>

          {/* Add to Cart and Buy Now buttons for mobile screens */}
          <div className="flex fixed bottom-0 block sm:hidden w-full">
            <div className="w-full">
              <Link to="/CartPage">
                <AddToCart
                  item={filterproduct}
                  Bgcolor="bg-yellow-400"
                  text="Buy Now"
                  paddingY="4"
                  paddingX
                />
              </Link>
            </div>
            <div className="w-full">
              <AddToCart item={filterproduct} paddingY="4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
