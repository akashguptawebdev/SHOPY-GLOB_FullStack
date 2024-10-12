import axios from "axios";
import { toast } from "react-toastify";
import { baseApiUrl } from "../../utils/BaseURL";
import { persistor } from "../../utils/reduxPersistConfig";
import { setAuthenticate, storeUser } from "../../utils/Redux/userSlice/UserSlice";

// Handle Logout
export const HandleLogout = async (dispatch, navigateTo) => {
  try {
    const res = await axios.get(`${baseApiUrl}/api/v1/user/logout`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    toast.success(res?.data.message);
    dispatch(setAuthenticate(false)); // Update authentication state
    dispatch(storeUser({})); // Clear user data
    persistor.purge(); // Clear persisted state

    navigateTo("/"); // Navigate to home page after logout
  } catch (err) {
    toast.error(err.message);
  }
};
