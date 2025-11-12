import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "12345") {
      localStorage.setItem("isLoggedIn", true);
      navigate("/home");
    } else {
      setError("Invalid email or password");
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

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: "#2874F0" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            <a
              href="#"
              className="text-decoration-none fw-semibold"
              style={{ color: "#2874F0" }}
            >
              Forgot Password?
            </a>
          </div>

          {/* <hr className="my-4" />

          <div className="text-center">
            <p className="mb-1 text-muted">New to Flipkart?</p>
            <a
              href="/register"
              className="btn fw-bold"
              style={{
                backgroundColor: "#FDD835",
                color: "#212121",
                borderRadius: "10px",
                width: "100%",
              }}
            >
              Create an account
            </a>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
