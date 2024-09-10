import React, { useState } from "react";
import Header from "../../components/Navbar/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import ProductList from "../../components/ProductList/ProductList";
import AuthPopup from "../../components/LoginPopup/LoginPopup";

const Home = () => {
  const [category, setCategory] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  return (
    <div>
      <Header setAuthMode={setAuthMode} setShowPopup={setShowPopup}/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <ProductList />
      {showPopup && <AuthPopup mode={authMode} setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Home;
