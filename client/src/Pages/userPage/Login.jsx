import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseApiUrl } from "../../utils/BaseURL.js";
import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import { useDispatch } from "react-redux";
import { setAuthenticate, storeUser } from "../../utils/Redux/userSlice/UserSlice.js"; // Ensure correct path

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // To handle multiple submissions
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable login button while waiting for response

    if (!email || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${baseApiUrl}/api/v1/user/login`,
        { email, password },
        {withCredentials:true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response?.data.success) {
        dispatch(setAuthenticate(true)); // Set authentication to true
        dispatch(storeUser(response.data.user)); // Store user details
        navigateTo("/"); // Redirect to homepage
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Re-enable login button
    }
  };

  return (
    <div className="mx-4 mt-4 max-w-4xl sm:mx-auto grid md:grid-cols-2 grid-cols-1 shadow-lg">
      <div className="template p-5 bg-[#1976d2] text-white w-full h-full hidden md:block">
        <div>
          <h1 className="text-4xl font-bold">Looks like you're new here!</h1>
          <p className="text-2xl mt-2 font-['Merriweather']">Sign up to get started</p>
        </div>
      </div>
      <div className="loginPage bg-white p-5">
        <h2 className="py-4 text-center font-extrabold text-xl font-['Spartan']">Login</h2>
        <div className="px-5">
          <div>
            <p>Email</p>
            <div className="userName-Input flex items-center">
              <PersonIcon />
              <input
                className="p-3 border-b-2 outline-none"
                type="email"
                value={email}
                placeholder="Type your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5">
            <p>Password</p>
            <div className="userName-Input flex items-center">
              <HttpsIcon />
              <input
                className="p-3 border-b-2 outline-none"
                type="password"
                value={password}
                placeholder="Type your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="forget-Pasword flex mt-5 justify-end font-['Merriweather']">
              <Link to={""}>Forget Password?</Link>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleLogin}
              className="m-5 px-14 py-2 rounded-md bg-[#111] font-['Spartan'] text-white"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="register text-center">
            <p className="text-center pt-10 p-5"> Or Signup using </p>
            <Link to={"/registerPage"} className="bg-[#1976d2] font-['Spartan'] px-14 py-2 rounded-md text-white">
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
