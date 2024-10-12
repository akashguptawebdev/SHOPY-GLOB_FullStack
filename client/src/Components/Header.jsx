import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchProduct from "./SearchProduct";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { baseApiUrl } from "../utils/BaseURL";
import { toast } from "react-toastify";
import { setAuthenticate, storeUser } from "../utils/Redux/userSlice/UserSlice";
import { persistor } from "../utils/reduxPersistConfig";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate()
  // Access the cart items from the Redux store
  const Cart = useSelector((store) => store.cart.items);
  // User data from Redux store
  const user = useSelector((state) => state.user.items);
  const isAuthenticated = useSelector((state) => state.user.authenticate);

  React.useEffect(() => {}, [isAuthenticated, user]);

  // Calculate the total quantity of items in the cart
  const cartLength = Cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Handle profile menu opening
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing mobile menu
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // Handle closing menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // Handle opening mobile menu
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Handle Logout
  const HandleLogout = async () => {
    try {
      const res = await axios.get(`${baseApiUrl}/api/v1/user/logout`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(res?.data.message);
      dispatch(setAuthenticate(false));
      dispatch(storeUser({})); // Clear user data
      persistor.purge(); // Clear persisted state

      navigateTo("/")
    } catch (err) {
      toast.error(err.message);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profilePage">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <Link to="/admin/adminPage">
      
      <div className="flex items-center justify-center border-2 border-red-100 bg-blue-100 hover:shadow-md">
      <AdminPanelSettingsIcon />
        <MenuItem onClick={handleMenuClose}>Admin</MenuItem>
      </div>
      </Link>
      <div onClick={HandleLogout}>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </div>

    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* Home link in mobile menu */}
      <MenuItem>
        <Link to="/">
          <IconButton size="large" color="inherit">
            <HomeIcon />
          </IconButton>
          <span>Home</span>
        </Link>
      </MenuItem>

      {/* Product link in mobile menu */}
      <MenuItem>
        <Link to="/CategoryProductPage/All">
          <IconButton size="large" color="inherit">
            <ShoppingBagRoundedIcon />
          </IconButton>
          <span>Products</span>
        </Link>
      </MenuItem>

      {/* Profile option in mobile menu */}

      {isAuthenticated ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <div className="flex justify-center items-center">
            <IconButton size="large" aria-controls={menuId} color="inherit">
              {isAuthenticated ? (
                <div className="rounded-full ">
                {user ? (
                  <img
                    src={user?.profilePhoto?.url}
                    alt="profile Pic"
                    className="rounded-full object-cover w-8 h-8"
                  />
                ) : (
                  <PersonIcon />
                )}
              </div>
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <p>Profile</p>
          </div>
        </MenuItem>
      ) : (
        <MenuItem>
          <Link to="/login" className="flex  items-center">
            <IconButton size="large" color="inherit">
              <LoginIcon />
            </IconButton>
            <p>Login</p>
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar component for navigation */}
      <AppBar position="static">
        <Toolbar>
          {/* Menu icon for mobile view */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Brand logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link to="/">
              <img src="/Brand3.png" alt="Brand Logo" className="w-40" />
            </Link>
          </Typography>

          {/* Search component */}
          <SearchProduct />

          {/* Cart icon for mobile view */}
          <Link to="/CartPage" className="block md:hidden">
            <IconButton size="large" color="inherit">
              <Badge badgeContent={cartLength} color="error">
                <ShoppingCartRoundedIcon />
              </Badge>
            </IconButton>
          </Link>

          {/* Spacing for aligning icons on the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Icons for desktop view */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <div className="">
              <IconButton size="large" color="inherit">
                <Link to="/">
                  <HomeIcon />
                </Link>
              </IconButton>
              <IconButton size="large" color="inherit">
                <Link to="/CartPage">
                  <Badge badgeContent={cartLength} color="error">
                    <ShoppingCartRoundedIcon />
                  </Badge>
                </Link>
              </IconButton>
              <IconButton size="large" color="inherit">
                <Link to="/CategoryProductPage/All">
                  <ShoppingBagRoundedIcon />
                </Link>
              </IconButton>

              {isAuthenticated ? (
                <IconButton
                  size="large"
                  edge="end"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {isAuthenticated ? (
                    <div className="rounded-full ">
                      {user ? (
                        <img
                          src={user?.profilePhoto?.url}
                          alt="profile Pic"
                          className="rounded-full object-cover w-8 h-8"
                        />
                      ) : (
                        <PersonIcon />
                      )}
                    </div>
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              ) : (
                <IconButton size="large" color="inherit">
                  <Link to="/login">
                    <LoginIcon />
                  </Link>
                </IconButton>
              )}
            </div>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Render mobile and desktop menus */}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
