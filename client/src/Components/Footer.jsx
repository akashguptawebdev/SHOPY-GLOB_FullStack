import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Column 1: Company Info */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-xl font-bold mb-2">
              <img src="/Brand3.png" alt="" />
            </h3>
            <p>Shoppy Globe – Your Global Destination for Trendy Shopping!</p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/CategoryProductPage/All"
                  className="hover:text-gray-400"
                >
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="" className="hover:text-gray-400">
                  Profile
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/CartPage" className="hover:text-gray-400">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <ul className="flex space-x-4">
              <li className="w-8">
                <Link
                  to="https://www.facebook.com/profile.php?id=100010296425247&mibextid=ZbWKwL"
                  aria-label="Facebook"
                >
                  <img src="/facebook_2504903.png" alt="Facebook icon" />
                </Link>
              </li>
              <li className="w-8">
                <Link to="https://www.instagram.com" aria-label="Instagram">
                  <img src="/instagram_2111463.png" alt="Instagram icon" />
                </Link>
              </li>
              <li className="w-8">
                <Link
                  to="https://www.linkedin.com/in/akash-gupta-766026309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  aria-label="LinkedIn"
                >
                  <img src="/twitter_3670151.png" alt="LinkedIn icon" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center pt-6 border-t border-gray-700">
          <p>&copy; 2024 Shoppy Globe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
