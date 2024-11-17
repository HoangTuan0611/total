import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import ProductPriceCard from "../../components/ProductPriceCard/ProductPriceCard";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const { urlProduct } = useContext(StoreContext);

  const reviews = [
    {
      name: "Minh Sơn",
      time: "khoảng 1 ngày",
      stars: 5,
      content:
        "15.11.2024 nay vừa mới mua một e ip16 promax 256 đang trải nghiệm. Mong rằng sẽ là một sp tốt nhất của apple",
      helpful: 0,
    },
    {
      name: "Minh",
      time: "khoảng 3 tuần",
      stars: 5,
      content:
        "Tôi cần liên hệ lại để hỗ trợ về vấn đề kỹ thuật, mong sớm có thông tin",
      helpful: 0,
    },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${urlProduct}detail/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id, urlProduct]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mt-10 flex flex-col md:flex-row">
        <div className="flex grid-cols-8">
          <ProductCard product={product}/>
        </div>
        <div className="flex grid-cols-4 ml-10">
          <ProductPriceCard product={product} />
        </div>
      </div>
      <div className="mt-10 review-section flex lg:col-grids-6">
        <div className="p-6 bg-white shadow rounded-lg">
          {/* Header */}
          <h2 className="text-lg font-semibold mb-4">
            Đánh giá Điện thoại iPhone 16 Pro Max 256GB
          </h2>
          <div className="flex items-center mb-6">
            <div className="text-3xl font-bold text-yellow-500">2.9</div>
            <div className="ml-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={`${i < 3 ? "text-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">50 đánh giá</p>
            </div>
          </div>

          {/* Star Rating Breakdown */}
          <div className="space-y-2 mb-6">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center">
                <p className="w-4">{star}</p>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 mx-1"
                />
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`bg-yellow-500 h-full`}
                    style={{ width: `${[28, 8, 22, 8, 34][5 - star]}%` }}
                  ></div>
                </div>
                <p className="w-10 text-right text-sm text-gray-500 ml-2">
                  {[28, 8, 22, 8, 34][5 - star]}%
                </p>
              </div>
            ))}
          </div>

          {/* Images */}
          <div className="flex space-x-2 mb-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-20 bg-gray-200 rounded-md flex items-center justify-center"
                >
                  {/* Placeholder for images */}
                  <p className="text-gray-500 text-sm">Image {i + 1}</p>
                </div>
              ))}
            <div className="h-20 w-20 bg-gray-800 text-white rounded-md flex items-center justify-center">
              <p className="text-sm">Xem 9 ảnh từ khách hàng</p>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex items-center space-x-4 mb-2">
                  <p className="font-semibold">{review.name}</p>
                  <span className="bg-green-100 text-green-500 px-2 py-1 text-xs rounded">
                    Đã mua tại TGDD
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={
                        i < review.stars ? "text-yellow-500" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mt-2">{review.content}</p>
                <div className="flex items-center space-x-4 mt-2 text-gray-500 text-sm">
                  <button className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>Hữu ích ({review.helpful})</span>
                  </button>
                  <span>Đã đăng {review.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
              Xem 50 đánh giá
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Viết đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
