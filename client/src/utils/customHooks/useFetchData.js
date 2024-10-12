import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../Redux/productSlice/DataSlice"; // Import the action from your slice

// Custom hook for fetching data
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url,{headers: {"Content-Type": "*" }});  
        dispatch(setProducts(response.data.allProduct)); 
        setData(response.data.allProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, dispatch]);

  return { data, loading, error };
};

export default useFetch;
