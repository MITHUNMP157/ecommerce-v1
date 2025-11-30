import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRLogin = async (e) => {
    e.preventDefault();

    const email = userData.email;
    const password = userData.password;

    if (!email || !password) {
      setError("Enter valid Credential");
      return;
    }

    try {
      await login(email, password);
      navigate("/");
      setUserData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "400px",
          borderRadius: "15px",
          backgroundColor: "#fff",
        }}
      >
        <div className="text-center mb-4">
          <h2
            className="fw-bold"
            style={{ color: "#2874F0", fontFamily: "Poppins, sans-serif" }}
          >
            Login to SmartBuyz
          </h2>
          <p className="text-muted small">
            Get access to your Orders & Wishlist
          </p>
        </div>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleRLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              style={{ borderColor: "#2874F0" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              style={{ borderColor: "#2874F0" }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{
              backgroundColor: "#FB641B",
              color: "white",
              fontSize: "16px",
              borderRadius: "10px",
            }}
          >
            Login
          </button>

          <div className="text-center mt-3">
            <Link
              href="#"
              className="text-decoration-none fw-semibold"
              style={{ color: "#2874F0" }}
            >
              Forgot Password?
            </Link>
          </div>

          <hr className="my-4" />

          <div className="text-center">
            <p className="mb-1 text-muted">New to SmartBuyz?</p>
            <Link
              to="/register"
              className="btn fw-bold"
              style={{
                backgroundColor: "#FDD835",
                color: "#212121",
                borderRadius: "10px",
                width: "100%",
              }}
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
