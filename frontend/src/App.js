import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import OrdersDetails from "./pages/OrdersDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function AppContent({ cartItem, setCartItem }) {
  const location = useLocation();

  const hideHeaderFooter = location.pathname === "/login";

  return (
    <>
      {!hideHeaderFooter && <Header cartItem={cartItem} />}
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
        <Route path="/login" element={<Login />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  const [cartItem, setCartItem] = useState(() => {
    const savedCart = localStorage.getItem("myCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <Router>
      <ToastContainer autoClose={3000} />
      <AppContent cartItem={cartItem} setCartItem={setCartItem} />
    </Router>
  );
}

export default App;
