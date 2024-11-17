import React, { useState } from "react";
import Header from "../../components/Navbar/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import ProductList from "../../components/ProductList/ProductList";
import AuthPopup from "../../components/LoginPopup/LoginPopup";

const Home = ({authMode, setAuthMode, showPopup, setShowPopup}) => {
  const [category, setCategory] = useState();;

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <ProductList />
      {showPopup && <AuthPopup mode={authMode} setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Home;
