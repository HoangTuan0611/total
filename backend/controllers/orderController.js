import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import crypto from "crypto";
import axios from "axios";

const placeOrder = async (req, res) => {
  const { userId, items, amount, address } = req.body;
  console.log('address', address);
  try {
    const newOrder = new orderModel({
      userId: userId,
      items: items,
      amount: amount,
      address: {
        firstName: address.firstName,
        lastName: address.lastName,
        email: address.email,
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country,
        phone: address.phone,
      },
      status: "Food processing",
      date: new Date().toISOString(), // Set the current date
      payment: 0, // Set the default payment status as unpaid
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    res.json({
      success: true,
      message: "Order placed successfully",
      data: { orderId: newOrder._id },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to place order" });
  }

  // payment with momo
  // // Thông tin thanh toán
  // var accessKey = "F8BBA842ECF85";
  // var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  // var orderInfo = "pay with MoMo";
  // var partnerCode = "MOMO";
  // var redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  // var ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  // var requestType = "payWithMethod";
  // var amount = "50000";
  // var orderId = partnerCode + new Date().getTime();
  // var requestId = orderId;
  // var extraData = "";
  // var paymentCode =
  //   "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==";
  // var orderGroupId = "";
  // var autoCapture = true;
  // var lang = "vi";

  // //before sign HMAC SHA256 with format
  // //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  // var rawSignature =
  //   "accessKey=" +
  //   accessKey +
  //   "&amount=" +
  //   amount +
  //   "&extraData=" +
  //   extraData +
  //   "&ipnUrl=" +
  //   ipnUrl +
  //   "&orderId=" +
  //   orderId +
  //   "&orderInfo=" +
  //   orderInfo +
  //   "&partnerCode=" +
  //   partnerCode +
  //   "&redirectUrl=" +
  //   redirectUrl +
  //   "&requestId=" +
  //   requestId +
  //   "&requestType=" +
  //   requestType;
  // //puts raw signature
  // console.log("--------------------RAW SIGNATURE----------------");
  // console.log(rawSignature);
  // //signature
  // var signature = crypto
  //   .createHmac("sha256", secretKey)
  //   .update(rawSignature)
  //   .digest("hex");
  // console.log("--------------------SIGNATURE----------------");
  // console.log(signature);

  // //json object send to MoMo endpoint
  // const requestBody = JSON.stringify({
  //   partnerCode: partnerCode,
  //   partnerName: "Test",
  //   storeId: "MomoTestStore",
  //   requestId: requestId,
  //   amount: amount,
  //   orderId: orderId,
  //   orderInfo: orderInfo,
  //   redirectUrl: redirectUrl,
  //   ipnUrl: ipnUrl,
  //   lang: lang,
  //   requestType: requestType,
  //   autoCapture: autoCapture,
  //   extraData: extraData,
  //   orderGroupId: orderGroupId,
  //   signature: signature,
  // });

  // const option = {
  //   method: "POST",
  //   url: "https://test-payment.momo.vn/v2/gateway/api/create",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: requestBody,
  // };

  // let result;
  // try {
  //   result = await axios(option);
  //   return res.status(200).json(result.data);
  // } catch (err) {
  //   console.log(err);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Error placing order",
  //   });
  // }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      // Update the payment status to true if the order is paid
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      // Delete the order if the payment was not successful
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};


export { placeOrder, verifyOrder};
