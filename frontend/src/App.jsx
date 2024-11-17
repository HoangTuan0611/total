import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Header from "./components/Navbar/Header/Header";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "./context/StoreContext";
import AuthPopup from "./components/LoginPopup/LoginPopup";
import Dtdd from "./pages/Dtdd/Dtdd";
import Laptop from "./pages/Laptop/Laptop";

const App = () => {
  const [showLogin, setShowLogin] = useState(false); // init 1 cái state showLogin, setShowLogin là 1 hàm set lại state cho showLogin
  const [showPopup, setShowPopup] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const {token} = useContext(StoreContext);
  
  return (
    <>
      {showPopup || !token ? <AuthPopup mode={authMode} setShowPopup={setShowPopup} /> : ''}
      <div className="app">
        <Header setAuthMode={setAuthMode} setShowPopup={setShowPopup} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                authMode={authMode}
                setAuthMode={setAuthMode}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/dtdd" element={<Dtdd />} />
          <Route path="/laptop" element={<Laptop />} />
        </Routes>
        <Footer />
        <ToastContainer/>
      </div>
    </>
  );
};

export default App;
