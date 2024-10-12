import axios from "axios";
import React from "react";
import { baseApiUrl } from "../../utils/BaseURL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HandleLogout } from "./LogoutFunction";
import { useDispatch } from "react-redux";

const profileDetails = ({ user, isAuthenticated }) => {
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const HandleDeleteAccount = async () => {
    const conformation = confirm("Are you sure To delete Account");
    if (conformation) {
      const Response = await axios.delete(
        `${baseApiUrl}/api/v1/user/deleteAccount`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success(Response);
      HandleLogout(dispatch, navigateTo );
      
      navigateTo("/")
    }
  };

  return (
    <div className="px-12 py-5 grid grid-cols-1 gap-5">
      <div className=" border px-2 shadow-md rounded-sm">
        <h1 className="font-['Spartan'] text-md text-md mt-2 Personal Information">
          Personal Information
        </h1>

        <h4 className="py-2"> {user?.name}</h4>
      </div>

      <div className=" border px-2 shadow-md rounded-sm">
        <h1 className="font-['Spartan'] text-md text-md mt-2 Personal Information">
          your gender
        </h1>

        <h4 className="py-2"> {user?.gender}</h4>
      </div>

      <div className=" border px-2 shadow-md rounded-sm">
        <h1 className="font-['Spartan'] text-md text-md mt-2 Personal Information">
          Email Address
        </h1>

        <h4 className="py-2"> {user?.email}</h4>
      </div>

      <div className=" border px-2 shadow-md rounded-sm">
        <h1 className="font-['Spartan'] text-md text-md mt-2 Personal Information">
          Mobile Number
        </h1>

        <h4 className="py-2"> {user?.contact_number}</h4>
      </div>

      <div className="">
        <button
          className="text-red-500  border px-2 shadow-md rounded-sm mt-2 py-4  font-extrabold"
          onClick={HandleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default profileDetails;
