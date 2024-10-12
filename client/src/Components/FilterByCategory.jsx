import React from "react";
import { useNavigate } from "react-router-dom";

const FilterByCategory = ({ products }) => {
  const navigate = useNavigate();

  // Get unique categories from the products
  const uniqueCategories = products?.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }
    return acc;
  }, []);

  // Handle category selection
  const handleCategoryChange = (category) => {
    navigate(`/CategoryProductPage/${category}`);
  };

  return (
    <div className="flex gap-2">
      <h1 className="font-extrabold text-center">Filter</h1>
      <select
        name="categoryFilter"
        id="categoryFilter"
        className="bg-white border outline-none rounded-sm"
        defaultValue="All"
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="All">All</option>
        {uniqueCategories?.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByCategory;
