import React from "react";
import UserProfile from "../../Components/User/ProfileSidebar";
import { useSelector } from "react-redux";
import ProfileDetails from "../../Components/User/profileDetails"
const ProfilePage = () => {
  // User data from Redux store
  const user = useSelector((state) => state.user.items);
  const isAuthenticated = useSelector((state) => state.user.authenticate);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2   mt-12">
      <div className="h-full">
        <UserProfile  user={user} isAuthenticated={isAuthenticated}/>
      </div>
      <div className=" col-span-2 bg-white">
      <ProfileDetails   user={user} isAuthenticated={isAuthenticated}/>
      </div>
    </div>
  );
};

export default ProfilePage;
