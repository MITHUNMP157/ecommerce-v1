import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./login-register/Login";
import Register from "./login-register/Register";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import OrdersDetails from "./pages/OrdersDetails";
import Profile from "./pages/Profile";
import ProductedRoute from "./routes/productRoute";

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
      <Routes>
        <Route
          path="/"
          element={
            <ProductedRoute>
              <Header cartItem={cartItem} />
              <Home />
              <Footer />
            </ProductedRoute>
          }
        />
        <Route path="/search" element={<Home />} />
        <Route
          path="/product/:id"
          element={
            <ProductedRoute>
              <Header cartItem={cartItem} />
              <ProductDetails cartItem={cartItem} setCartItem={setCartItem} />
              <Footer />
            </ProductedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProductedRoute>
              <Header cartItem={cartItem} />
              <OrdersDetails /> <Footer />
            </ProductedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProductedRoute>
              <Header cartItem={cartItem} />
              <Cart cartItem={cartItem} setCartItem={setCartItem} />
              <Footer />
            </ProductedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProductedRoute>
              <Header cartItem={cartItem} />
              <Profile />
              <Footer />
            </ProductedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
