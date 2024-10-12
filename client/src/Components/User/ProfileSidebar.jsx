import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonIcon from "@mui/icons-material/Person";
import { HandleLogout } from "./LogoutFunction.js";
import { useDispatch } from "react-redux";
const userProfile = ({ user, isAuthenticated }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  return (
    <div className="h-full">
      {/* profileHeading */}
      <div className=" flex bg-white p-5 gap-2 mb-2 md:h-24 shadow-md">
        <div className="rounded-full ">
          {user ? (
            <img
              src={user?.profilePhoto?.url}
              alt="profile Pic"
              className="rounded-full object-cover w-14 h-14"
            />
          ) : (
            <PersonIcon />
          )}
        </div>

        <div>
          <p className="text-slate-500">Hello,</p>
          <h1 className="font-['Spartan'] text-sm mt-2">
            {isAuthenticated && user?.name}
          </h1>
        </div>
      </div>

      <div className="bg-white row-span-3 p-5  ">
        {/* Order Item */}
        <div>
          <Link>
            <div className="flex justify-between items-center py-8 px-6">
              <div className="flex gap-6">
                <BusinessCenterIcon />
                <h1 className="font-bold text-md text-slate-500">MY ORDERS</h1>
              </div>
              <ArrowForwardIosIcon />
              {/* Icon */}
            </div>
          </Link>
        </div>

        {/* Order Item */}
        <div>
          <Link>
            <div className="flex justify-between items-center py-8 px-6">
              <div className=" flex gap-6">
                <PersonIcon />
                <div>
                  <h1 className="font-bold text-md text-slate-500">
                    ACCOUNT SETTINGS
                  </h1>
                  <ul className="mt-2 hover:bg-blue-100 w-full py-4 px-2 rounded font-semibold">
                    <li>Profile Information</li>
                  </ul>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Logout Div */}
        <div className="w-full bottom-0 ">
          <Link>
            <div className="flex justify-between items-center py-8 sm:mt-20 px-6">
              <div
                className="flex gap-6"
                onClick={() => HandleLogout(dispatch, navigateTo)}
              >
                <PowerSettingsNewIcon />
                <h1 className="font-bold text-md text-slate-500">LOGOUT</h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default userProfile;
