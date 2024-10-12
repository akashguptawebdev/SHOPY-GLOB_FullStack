import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../utils/Redux/DataSlice"; // Import the action from your slice
import ProductCard from "./ProductCard";

const ProductComponent = () => {
const data = useSelector((store)=> store.Product.products)


  return <div className="flex flex-wrap gap-4 mt-10">
    {data?.map((item)=>(
        <div className="w-20 ">
            <ProductCard Product={item} />
        </div>
   ) )}
  </div>;
};

export default ProductComponent;
