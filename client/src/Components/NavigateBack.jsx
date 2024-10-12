import React from "react";
const NavigateBack = () => {
  const handleNavigateBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleNavigateBack}
      className="flex items-center text-blue-500 hover:text-blue-700"
    >
      <span className="text-lg">
        <img
          src="/left_3514167.png"
          className="w-6 sm:w-8 m-2"
          alt="Back to Home"
        />
      </span>
    </button>
  );
};

export default NavigateBack;
