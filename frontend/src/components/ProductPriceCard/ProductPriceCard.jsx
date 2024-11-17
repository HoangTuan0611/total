import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faCheckCircle,
  faTruck,
  faShoppingCart,
  faBolt,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

const ProductPriceCard = ({ product }) => {
  console.log(product);
  
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-lg">
      {/* Header */}
      <div className="bg-orange-100 p-3 rounded-md">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-orange-600 font-bold flex items-center">
              <FontAwesomeIcon icon={faFire} className="mr-2" />
              Online Giá Rẻ Quá
            </h3>
            <p className="text-3xl font-bold text-red-600 mt-1">
              {product.price
                ? new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)
                : "N/A"}
            </p>
            <p className="text-gray-500 line-through text-sm">
              {product.price + 5000000
                ? new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price + 5000000)
                : "N/A"}{" "}
              (-1%)
            </p>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>Kết thúc vào</p>
            <p className="font-semibold">23:59 | 30/11</p>
            <p className="font-bold text-orange-600">Tại Hồ Chí Minh</p>
          </div>
        </div>
      </div>

      {/* Promotions */}
      <div className="mt-4 border rounded-lg p-3 bg-gray-50">
        <h4 className="text-sm font-semibold mb-2">Khuyến mãi</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-blue-500 mr-2"
            />
            Nhập mã VNPAYTGDĐ5 giảm từ 50,000đ đến 200,000đ (áp dụng tùy giá trị
            đơn hàng) khi thanh toán qua VNPAY-QR.{" "}
            <a href="#" className="text-blue-500 underline">
              (Xem chi tiết tại đây)
            </a>
          </li>
          <li>
            <FontAwesomeIcon icon={faTruck} className="text-blue-500 mr-2" />
            Giao hàng nhanh chóng (tùy khu vực)
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-blue-500 mr-2"
            />
            Mỗi số điện thoại chỉ mua 3 sản phẩm trong 1 tháng
          </li>
        </ul>
        <a href="#" className="text-sm text-blue-500 underline block mt-2">
          Chọn địa chỉ nhận hàng để biết thời gian giao.
        </a>
      </div>

      {/* Online Payment Offers */}
      <div className="mt-4 border rounded-lg p-3 bg-gray-50">
        <h4 className="text-sm font-semibold mb-2">
          Ưu đãi thanh toán Online (Click chọn để áp dụng)
        </h4>
        <div className="flex items-center justify-between text-sm bg-green-100 p-2 rounded-md">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCreditCard} className="text-green-500" />
            <p>Giảm 500.000đ</p>
          </div>
          <p className="text-gray-500">Sản phẩm từ 10 triệu</p>
        </div>
      </div>

      {/* Points and Actions */}
      <div className="mt-4">
        <p className="text-sm text-gray-700">
          +34.490 điểm tích lũy Quà Tặng VIP
        </p>
        <div className="flex items-center space-x-2 mt-4">
          <button className="flex-1 py-2 px-4 border rounded-md text-gray-700 hover:bg-gray-100">
            Thêm vào giỏ
          </button>
          <button className="flex-1 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            Mua ngay
          </button>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <button className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Mua trả góp 0%
          </button>
          <button className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Trả góp 0% qua thẻ
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-sm text-gray-700">
        <p className="mb-2">
          <FontAwesomeIcon icon={faBolt} className="text-orange-500 mr-2" />
          Gọi đặt mua 1900 232 462 (8:00 - 21:30)
        </p>
        <a href="#" className="text-blue-500 underline block text-center mt-2">
          Xem siêu thị có hàng
        </a>
      </div>
    </div>
  );
};

export default ProductPriceCard;
