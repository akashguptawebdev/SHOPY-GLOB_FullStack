import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseApiUrl } from "../../utils/BaseURL.js";
import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import { useDispatch } from "react-redux";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Loading from "../../Components/Loading.jsx";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState(""); // Track gender
  const [selectedImage, setSelectedImage] = useState(null); // Handle the selected file
  const [isRegister, setIsRegister] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = async (e) => {
    setIsRegister(true)
  
    e.preventDefault();

    // Create a new FormData instance
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("contact_number", contactNumber);
    formData.append("gender", gender);

    // Append the file if selected
    if (selectedImage) {
      formData.append("avatar", selectedImage);
    }

    const RegisterUser = async () => {
      try {
        const response = await axios.post(
          `${baseApiUrl}/api/v1/user/register`,
          formData,
          {
            withCredentials: true,
          }
        );

        if (response.data) {
          setIsRegister(false)
          toast.success("user Register successfully!");
          console.log("Response:", response.data);
          // Optionally, redirect or handle success
          navigateTo("/login");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form!");
      }
    };

    RegisterUser();
  };

  useEffect(() => {
    console.log(gender); // Log gender when it changes
  }, [gender]);

  // Handle the image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Set the selected image file (not URL)
    }
  };

  // Trigger the file input when the div is clicked
  const handleDivClick = () => {
    document.getElementById("imageInput").click();
  };

  if (isRegister) {
    const message = "Registering your account, please wait...";
    return (
      <div className="">
        <Loading message={message} />
      </div>
    );
  }

  return (
    <>
      <div className="mx-4 mt-4 max-w-4xl sm:mx-auto grid md:grid-cols-2 grid-cols-1 shadow-lg">
        <div className="template p-5 bg-[#1976d2] text-white w-full h-full hidden md:block">
          <div>
            <h1 className="text-4xl font-bold">Looks like you're new here!</h1>
            <p className="text-2xl mt-2 font-['Merriweather']">
              Sign up to get started
            </p>
          </div>
        </div>
        <div className="loginPage bg-white p-5">
          <h2 className="py-4 text-center font-extrabold text-xl font-['Spartan']">
            Register
          </h2>

          <div className="flex items-center justify-center mt-5">
            <div
              className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer"
              onClick={handleDivClick}
            >
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)} // Temporary URL for preview
                  alt="Selected"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <p className="text-sm text-blue-600">Upload</p>
              )}
            </div>

            {/* The hidden file input */}
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="px-5">
            <div className="">
              <p className="">Name</p>
              <div className="userName-Input flex items-center">
                <PersonIcon />
                <input
                  className="p-3 border-b-2 outline-none"
                  type="text"
                  value={name}
                  placeholder="Type your Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Gender selection */}
            <div className="flex justify-start items-center gap-2 py-4 text-slate-400">
              <div className="hover:text-[#111] flex items-center gap-2 justify-center text-lg">
                <label htmlFor="male">Male</label>
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              <div className="hover:text-[#111] flex items-center gap-2 justify-center text-lg">
                <label htmlFor="female">Female</label>
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className="hover:text-[#111] flex items-center gap-2 justify-center text-lg">
                <label htmlFor="other">Other</label>
                <input
                  id="other"
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>

            <div className="py-2">
              <p>Contact Number</p>
              <div className="flex items-center">
                <PermContactCalendarIcon />
                <input
                  className="p-3 border-b-2 outline-none"
                  type="text"
                  value={contactNumber}
                  placeholder="Contact Number"
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <p className="">Email</p>
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
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="m-5 px-14 py-2 rounded-md bg-[#111] font-['Spartan'] text-white"
              >
                Register
              </button>
            </div>

            <div className="register text-center">
              <p className="text-center pt-10 p-5">Or Login using</p>
              <Link
                to={"/login"}
                className="bg-[#1976d2] font-['Spartan'] px-14 py-2 rounded-md text-white"
              >
                LOG-IN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
