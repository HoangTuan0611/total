import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {

  const [foodList, setFoodList] = useState([
    {
      _id: "1",
      name: "Chicken Fried Rice 1",
      description: "Delicious chicken fried rice with mixed vegetables",
      price: 12.99,
      image: "https://example.com/chicken-fried-rice.jpg",
      category: "Appetizers",
    },
    {
      _id: "2",
      name: "Chicken Fried Rice 2",
      description: "Delicious chicken fried rice with mixed vegetables",
      price: 12.99,
      image: "https://example.com/chicken-fried-rice.jpg",
      category: "Appetizers",
    },
    {
      _id: "2",
      name: "Chicken Fried Rice 3",
      description: "Delicious chicken fried rice with mixed vegetables",
      price: 12.99,
      image: "https://example.com/chicken-fried-rice.jpg",
      category: "Appetizers",
    },
  ]);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {
          foodList.map((food) => {
            return (
              <FoodItem
                id={food._id}
                name={food.name}
                description={food.description}
                price={food.price}
                image={food.image}
              />
            )
          })
        }
        {/* {foodList.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })} */}
      </div>
    </div>
  );
};

export default FoodDisplay;
