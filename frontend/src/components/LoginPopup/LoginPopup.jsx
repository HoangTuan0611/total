import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const AuthPopup = ({ mode, setShowPopup }) => {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Load asset from context
  const { url, token, setToken} = useContext(StoreContext)
  // Close the popup
  const handleClose = () => {
    setShowPopup(false);
  };

  // Toggle between Login and Sign Up mode
  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  // Updated onChangeUser function
  const onChangeUser = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const onAuth = async (e) => {
    e.preventDefault()
    let newUrl = url
    if(isLogin){
      newUrl += 'api/user/login'
    } else {
      newUrl += 'api/user/register'
    }
    const response = await axios.post(newUrl, user)
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      setShowPopup(false)
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    console.log(response.data);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-96 p-8 rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={onAuth}>
          {!isLogin && (
            <div className="mb-4">
              <input
                type="text"
                name="name"
                onChange={(e) => onChangeUser(e)}
                placeholder="Your name"
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          )}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              onChange={(e) => onChangeUser(e)}
              placeholder="email@gmail.com"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              onChange={(e) => onChangeUser(e)}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">
              By continuing, I agree to the terms of use & privacy policy.
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            {isLogin ? "Login" : "Create account"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Create a new account?{" "}
              <span
                onClick={toggleMode}
                className="text-red-500 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={toggleMode}
                className="text-red-500 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
