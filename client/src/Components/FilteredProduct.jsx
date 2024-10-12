import React from "react";
import { Link } from "react-router-dom";
import FilterByCategory from "./FilterByCategory";
import Loading from "./Loading";
import NavigateBack from "./NavigateBack";

const FilteredProduct = ({ products, params }) => {
  // Filter the products based on category

  const Filteredproduct =
    params === "All"
      ? products
      : products?.filter((item) => item.category === params);

  // Star rating component
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

  return (
    <div className="mt-2 px-4">
      {/* Back Navigation */}
      <NavigateBack />

      {/* Filter by Category */}
      <div className="flex justify-center items-center border shadow-md bg-white text-black py-2">
        <FilterByCategory products={products} />
      </div>

      {/* Loading or Display Products */}
      {!Filteredproduct ? (
        <div className="flex justify-center items-center h-screen w-full">
          <Loading />
        </div>
      ) : (
        <div className="mainContainer mt-4 px-4 sm:flex gap-2 bg-slate-50 sm:flex-wrap">
          {Filteredproduct.map((item) => (
            <Link key={item._id} to={`/ProductDetailsPage/${item._id}`}>
              <hr />
              <div className="grid grid-cols-2 w-full gap-4 sm:w-44 md:w-60 sm:grid-cols-1 hover:shadow-lg items-center px-2">
                {/* Product Image */}
                <div className="w-full">
                  <img src={item.images[0].url} alt={item.title} />
                </div>

                {/* Product Details */}
                <div className="w-full">
                  <h1 className="text-xs mt-4 sm:text-md w-full">
                    {item.title}
                  </h1>

                  {/* Star Rating */}
                  <div className="flex items-center mt-2 gap-1">
                    <StarRating rating={item.rating} />
                    <span className="text-xs text-blue-500">
                      {item.rating} <span>ratings</span>
                    </span>
                  </div>

                  {/* Price and Discount */}
                  <div className="offers flex gap-2 items-center py-2">
                    <span className="font-semibold">${item.price}</span>
                    <span className="line-through text-slate-400">
                      $
                      {Math.floor(
                        item.price + (item.price % item.discountPercentage)
                      )}
                    </span>
                    <p className="text-green-600 font-extrabold text-xs">
                      {item.discountPercentage}% off
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilteredProduct;
