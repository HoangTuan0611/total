import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Navbar/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import AppDownload from "../../components/AppDownload/AppDownload";
import ProductList from "../../components/ProductList/ProductList";
const Home = () => {
  const [category, setCategory] = useState();
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <ProductList />

      {/* <AppDownload /> */}
    </div>
  );
};

export default Home;
