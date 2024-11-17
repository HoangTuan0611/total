import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = `http://localhost:4000/`;
  const urlProduct = `http://localhost:4000/api/product/`;
  const [token, setToken] = useState("");
  const [listProduct, setListProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    getListProducts();
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      const getToken = localStorage.getItem("token");
      loadCartData(getToken);
    }
  }, []);

  const getListProducts = async () => {
    try {
      const newUrl = urlProduct + `list`;
      const response = await axios.get(newUrl);
      setListProduct((prevProducts) => [
        ...prevProducts,
        ...response.data.data,
      ]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (itemId) => {
    console.log(itemId);
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      // http://localhost:4000/api/cart/add
      await axios.post(
        url + "api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = listProduct.find((product) => product._id === item);
        totalAmount += itemInfo?.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.data);
  };

  const contextValue = {
    url,
    urlProduct,
    token,
    setToken,
    listProduct,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
