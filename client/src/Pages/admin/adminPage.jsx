import React from "react";
import { Link } from "react-router-dom";
import NavigateBack from "../../Components/NavigateBack";

const AdminPage = () => {
  return (
    <>
      <span className="">
        <NavigateBack />
      </span>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="my-8 w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 border border-gray-300 rounded-lg shadow-md bg-white">
          <Link to="/admin/CreateCategory">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
              Create Category
            </button>
          </Link>
        </div>
        <div className="my-8 w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 border border-gray-300 rounded-lg shadow-md bg-white">
          <Link to="/admin/createProduct">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
              Create Product
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
