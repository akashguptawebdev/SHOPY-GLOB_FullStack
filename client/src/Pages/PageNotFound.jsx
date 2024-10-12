import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-200 via-pink-200 to-purple-100">
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
          alt="Page not found"
          className="w-64 h-64 sm:w-80 sm:h-80 rounded-full shadow-lg"
        />
        
        {/* Error Message */}
        <h1 className="text-6xl sm:text-8xl font-extrabold text-purple-700">
          Oops!
        </h1>
        <p className="text-2xl sm:text-3xl font-semibold text-gray-800">
          We can't find the page you're looking for.
        </p>
        
        {/* Back to Home Button */}
        <Link to="/">
          <button className="mt-6 px-6 py-3 bg-purple-600 text-white text-lg sm:text-xl font-bold rounded-full shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
