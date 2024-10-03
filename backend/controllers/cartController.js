import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = (await userData.cartData);
    if (!cartData[req.body.itemId]) {
      console.log(cartData);
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item added to cart",
      data: { cartData },
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Add to cart failed" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = (await userData.cartData);

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item removed from cart",
      data: { cartData },
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Remove from cart failed" });
  }
};

const getCart = async (req, res) => {
    try {
      // Find the user by userId
      let userData = await userModel.findOne({ _id: req.body.userId });
  
      // Check if the user exists
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
  
      // Get the cart data
      let cartData = userData.cartData;
  
      // Respond with the cart data
      res.json({
        success: true,
        message: "Cart retrieved successfully",
        data: cartData,
      });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error retrieving cart" });
    }
  };
  

export { addToCart, removeFromCart, getCart };
