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
  }, []);

  const getListProducts = async () => {
    try {
      const url = urlProduct + `list`;
      const response = await axios.get(url);
      setListProduct((prevProducts) => [
        ...prevProducts,
        ...response.data.data,
      ]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

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
