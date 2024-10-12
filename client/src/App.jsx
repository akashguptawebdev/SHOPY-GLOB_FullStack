import React, { useEffect } from "react";
import "./App.css";
import PrimarySearchAppBar from "./Components/Header";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import Footer from "./Components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./Pages/PageNotFound.jsx";
import CartPage from "./Pages/CartPage.jsx";
import ProductDetailsPage from "./Pages/ProductDetailsPage.jsx";
import CategoryProductPage from "./Pages/CategoryProductPage.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  storeUser,
  setAuthenticate,
} from "./utils/Redux/userSlice/UserSlice.js";
import { baseApiUrl } from "./utils/BaseURL.js";
import Login from "./Pages/userPage/Login.jsx";
import axios from "axios";
import useFetch from "./utils/customHooks/useFetchData.js";
import ProfilePage from "./Pages/userPage/UserDashboard.jsx";
import RegisterPage from "./Pages/userPage/RegisterPage.jsx";
import CreateProduct from "./Pages/admin/createProduct.jsx";
import CreateCategory from "./Pages/admin/CreateCategory.jsx";
import AdminPage from "./Pages/admin/adminPage.jsx";
// http://localhost:2850/api/v1/product
// https://dummyjson.com/products
const App = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { data, loading, error } = useFetch(`${baseApiUrl}/api/v1/product`);
  // Get Redux state for user and authentication
  const user = useSelector((state) => state.user.items);
  const isAuthenticated = useSelector((state) => state.user.authenticate);
  // Fetch user data when the app loads or login changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          const response = await axios.get(
            `${baseApiUrl}/api/v1/user/getUserProfile`,
            {
              withCredentials: true,
              headers: { "Content-Type": "*" },
            }
          );
          dispatch(storeUser(response?.data)); // Store user data in Redux
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        dispatch(setAuthenticate(false)); // Set authentication to false on error
      }
    };

    fetchUserData(); // Fetch user data on first load
  }, [isAuthenticated, dispatch]);

  // PrivateRoute Component
  const PrivateRoute = ({ children }) => {
    // Check if the user is authenticated and is an admin
    if (!isAuthenticated || user?.role !== "admin") {
      return navigateTo("/login");
    }

    // Render children (admin routes) if user is authenticated and is an admin
    return children;
  };

  const location = useLocation();
  let path;
  const findPath = location.pathname.split("/")[1];
  if (findPath === "ProductDetailsPage") {
    path = "ProductDetailsPage";
  }

  return (
    <>
      <PrimarySearchAppBar />
      <div className="sm:px-20 mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route
            path="/ProductDetailsPage/:id"
            element={<ProductDetailsPage />}
          />
          <Route
            path="/CategoryProductPage/:catName"
            element={<CategoryProductPage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registerPage" element={<RegisterPage />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/*" element={<PageNotFound />} />

          {/* Admin Routes wrapped with PrivateRoute */}
          <Route
            path="/admin/adminPage"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/CreateCategory"
            element={
              <PrivateRoute>
                <CreateCategory />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/createProduct"
            element={
              <PrivateRoute>
                <CreateProduct />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/CartPage"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
        </Routes>

        <ToastContainer position="top-center" autoClose="2000" />
      </div>
      {/* Conditionally render Footer except for ProductDetailsPage */}
      {path !== "ProductDetailsPage" && <Footer />}
    </>
  );
};

export default App;
