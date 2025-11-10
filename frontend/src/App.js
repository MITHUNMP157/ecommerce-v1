import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import OrdersDetails from "./pages/OrdersDetails";
import Profile from "./pages/Profile";

function App() {
  const [cartItem, setCartItem] = useState(() => {
    const savedCart = localStorage.getItem("myCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Header cartItem={cartItem} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Home />} />
          <Route
            path="/product/:id"
            element={
              <ProductDetails cartItem={cartItem} setCartItem={setCartItem} />
            }
          />
          <Route path="/orders" element={<OrdersDetails />} />
          <Route
            path="/cart"
            element={<Cart cartItem={cartItem} setCartItem={setCartItem} />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
