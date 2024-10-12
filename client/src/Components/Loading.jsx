import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = ({ message = "" }) => {
  return (
    <div className="h-screen w-full flex flex-col  justify-center items-center">
      <h1 className="text-center pt-20 text-xl relative -top-5 font-bold mb-4">
        {message}
      </h1>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default Loading;
