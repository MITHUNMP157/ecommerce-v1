import React from "react";
import "./Header.css";
import BrandLogo from "./images/SmartBuyz-logo1.png";
import Search from "./Search";
import { Link } from "react-router-dom";

const Header = ({ cartItem, setSearchParams }) => {
  return (
    <nav className="navbar-main">
      <div className="navbar-main-nav">
        <div className="brand-logo text-sm-center mb-2">
          <Link to="/">
            <img
              src={BrandLogo}
              alt="SmartBuyz"
              style={{ width: "250px", height: "auto" }}
            />
          </Link>
        </div>
        <Search setSearchParams={setSearchParams} />
        <div className="nav-items">
          <Link to="/profile" className="nav-item-link link-hover me-2 rounded">
            Profile
          </Link>
          <Link
            to="/orders"
            className="nav-item-link link-hover rounded  me-2 "
          >
            Orders
          </Link>
          <Link to="/cart" className="nav-item-link link-hover rounded">
            Cart
            <Link to="/cart" className="cart-count">
              {cartItem.length}
            </Link>
          </Link>
          <Link
            to="/orders"
            className="nav-item-link link-hover rounded  me-2 "
          >
            Orders
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
