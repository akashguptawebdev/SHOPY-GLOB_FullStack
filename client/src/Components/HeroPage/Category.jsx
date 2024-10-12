import React from "react";
import { Link } from "react-router-dom";

const Category = ({ products }) => {
  // Filter unique categories from products
  const uniqueCategoryProducts =
    products &&
    products.filter(
      (item, index, self) =>
        index === self.findIndex((p) => p.category === item.category)
    );

  return (
    <>
      <div className="bg-green-200 w-full mt-8">
        <span className="font-extrabold px-4 uppercase italic text-green-900">
          Top Categories
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {uniqueCategoryProducts?.map((item) => (
            <div
              key={item.category} // Added key for each unique category
              className="w-32 sm:w-40 py-2 bg-slate-950 rounded-md m-2 text-white mx-auto"
            >
              <Link to={`/CategoryProductPage/${item.category}`}>
                <img
                  className="w-full h-24 object-cover" // Adjusted class for image size
                  src={item.images[0].url}
                  alt={item.category}
                />
                <h1 className="uppercase text-xs font-extrabold text-center mt-2">
                  {item.category}
                </h1>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Promotional Banners */}
      <div className="w-full mt-8">
        <img
          src="/electronic-store-promotional-banner-2.jpg"
          className="w-full sm:h-32 object-cover"
          alt="Promotional Banner 2"
        />
      </div>

      <div className="w-full mt-4 mb-6">
        <img
          src="/electronic-store-promotional-banner-1.jpg"
          className="w-full sm:h-32 object-cover"
          alt="Promotional Banner 1"
        />
      </div>
    </>
  );
};

export default Category;
