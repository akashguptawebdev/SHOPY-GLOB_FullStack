import React from "react";
import { Link } from "react-router-dom";
import AddToCart from "../AddToCart";

const HeroProducts = ({ products }) => {

  return (
    <div className="bg-purple-300 w-full mt-8">
      <h1 className="font-extrabold p-4 uppercase italic text-slate-500">
        Products
      </h1>
      <span className="px-2 font-semibold italic uppercase">
        {products && products.Category}
      </span>
      <div className="grid grid-cols-2 lg:grid-cols-8 sm:grid-cols-4 gap-4">
        {products?.map((item) => (
          <div
            key={item._id} // Add key for list rendering
            className="w-36 py-2 flex flex-col justify-between bg-slate-100 rounded-md m-2 text-black mx-auto"
          >
            <Link to={`/ProductDetailsPage/${item?._id}`}>
              <img
                className="h-40 mx-auto"
                src={item.images[0].url}
                alt={item.title}
              />
              <h1 className="uppercase text-xs font-semibold text-center mt-2">
                {item.title}
              </h1>
            </Link>
            <div className="mx-4">
              <AddToCart item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroProducts;
