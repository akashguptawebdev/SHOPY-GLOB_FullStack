import React, { useState } from "react";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import Loading from "../../Components/Loading";
import { Box, CircularProgress } from "@mui/material";
import NavigateBack from "../../Components/NavigateBack";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loding, setLoding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      name,
      description,
      image,
    };
    setLoding(true);

    try {
      const response = await axios.post(
        "http://localhost:2850/api/v1/category/createCategory",
        newCategory,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      // Success handling
      console.log("Category created successfully:", response.data);
      if (response) {
        setLoding(false);
        clearField();
      }
    } catch (error) {
      // Error handling
      console.error(
        "Error occurred while creating category:",
        error.response.data
      );
      setLoding(false);
    }
  };

  const clearField = () => {
    setName("");
    setDescription("");
    setImage("");
  };

  return (
    <div className="container mx-auto p-6">
        <span className="">
        <NavigateBack />
      </span>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Create New Category
      </h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto"
        onSubmit={handleSubmit}
      >
        {/* Category Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Category Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            required
            maxLength={255}
          />
        </div>

        {/* Category Description */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Category Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter category description"
            maxLength={1000}
          />
        </div>

        {/* Category Image */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Category Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="categoryImage"
            type="file"
            name="categoryImage"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />
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
              "Create Category"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
