import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchProduct = () => {
  const [inputValue, setInputValue] = useState(""); // State to hold the search input value
  const [SearchProduct, setSearchProduct] = useState([]); // State to hold the filtered search results

  const data = useSelector((store) => store.Product.products); // Fetch products from the Redux store

  useEffect(() => {
    if (!inputValue) {
      // Reset search results if input is empty
      setSearchProduct([]);
      return;
    }

    // Convert input to lowercase for case-insensitive filtering
    const lowercasedInput = inputValue?.toLowerCase();

    // Filter products based on title, category, brand, and description
    const filteredProduct = data?.filter(
      (item) =>
        item.title?.toLowerCase().includes(lowercasedInput) ||
        item.category?.toLowerCase().includes(lowercasedInput) ||
        item.brand?.toLowerCase().includes(lowercasedInput) ||
        item.description?.toLowerCase().includes(lowercasedInput)
    );

    if (filteredProduct?.length != 0) {
      setSearchProduct(filteredProduct); // Update state with filtered products
    } else {
      setSearchProduct(""); // Reset search results if no match is found
    }
  }, [inputValue, data]); // Dependency array includes inputValue and data

  // Function to clear search input and hide results
  const handleCardClick = () => {
    setInputValue("");
    setSearchProduct([]);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="px-5 sm:px-20">
        <form className="flex justify-center items-center bg-gray-200 text-black rounded-md">
          <input
            type="text"
            value={inputValue} // Bind input value to state
            placeholder="Search for product, brand and more..."
            className="w-full py-2 px-4 bg-gray-200 rounded-md focus:outline-none placeholder-text-sm placeholder-text-lg"
            onChange={(e) => setInputValue(e.target.value)} // Update state when input changes
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Search Results */}
      {SearchProduct && (
        <div
          className={`justify-center bg-slate-200 rounded-md items-center  absolute top-16 sm:top-16 sm:w-[70%] h-80 overflow-x-hidden   ${
            inputValue ? "absolute top-20 z-50 bg-base-200" : "hidden"
          }`}
        >
          {SearchProduct?.map((item) => (
            <Link to={`/ProductDetailsPage/${item?.id}`} key={item?.id}>
              <div
                key={item.id} 
                className=" w-[90vw] sm:w-full   px-2 shadow-md mb-1 z-30 "
                onClick={handleCardClick} 
              >
                <div className="flex bg-white border">
                  <div className="w-12 p-2">
                    <img src={item.images[0].url} alt="" />
                  </div>
                  <div className="flex flex-col justify-center ">
                    <h1 className="text-slate-900 text-sm">{item.title}</h1>
                    <p className="text-sm font-bold italic"> {item.brand}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchProduct;
