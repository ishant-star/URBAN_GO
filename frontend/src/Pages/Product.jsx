import React, { useState, useEffect } from "react";
import Nav from "../Components/Nav";
import { FaArrowAltCircleRight, FaSearch, FaOpencart } from "react-icons/fa";
import products from "../Items/Item";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Components/Footer";

function Product() {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  // 🛒 Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 🧠 Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
    console.log(cart);
  }, [cart]);

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token;
  };

  // ✅ Add/Remove from Cart with authentication check
  const toggleCart = (product) => {
    // Check if user is logged in
    if (!isAuthenticated()) {
      toast.error("Please login or create your account to add items to cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const isInCart = cart.some((item) => item.id === product.id);

    const updatedCart = isInCart
      ? cart.filter((item) => item.id !== product.id) // remove
      : [...cart, product]; // add

    setCart(updatedCart);

    // Show success toast
    if (!isInCart) {
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.info(`${product.name} removed from cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // 🔍 Filter products
  const filteredProducts = products
    .filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
     // limit to 6 products

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 py-20">
        <h1 className="text-center text-6xl font-bold text-emerald-500">
          ORGANIC <span className="text-emerald-200">PANTRY</span>
        </h1>
        <h1 className="text-center mt-6 text-lg text-emerald-600 font-semibold">
          Premium quality groceries sourced from local organic farms
        </h1>
        <div className="h-1 w-30 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-200 rounded-3xl mx-auto mt-8"></div>

        {/* 🔍 Search Bar */}
        <div className="group flex border-2 border-emerald-500 rounded-3xl h-18 w- sm:w-135  mt-30 mx-auto focus:outline-8">
          <input
            className="group my-auto h-11 w-120 p-5 text-lg text-white placeholder:text-emerald-700 placeholder:font-semibold placeholder:text-lg outline-none"
            placeholder="Search fruits, vegetables, meats..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="h-10 w-15 mr-1 sm:mr-0 sm:h-11 sm:w-11 place-content-center m-auto bg-emerald-600 rounded-full">
            <FaSearch className="text-white mx-auto sm:text-2xl text-xl" />
          </div>
        </div>

        <img
          src="https://clipart-library.com/img/2004602.png"
          className="my-10 h-10 w-full opacity-10"
          alt=""
        />

        {/* 🛍 Product List */}
        <div className="p-3 shadow-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inCart = cart.some((item) => item.id === product.id);
            return (
              <div
                key={product.id}
                className="mt-10 rounded-3xl border-2 border-emerald-400 overflow-hidden bg-gradient-to-r from-emerald-800 to-emerald-900 shadow-2xl hover:shadow-none hover:-translate-y-2.5 transition-all ease-in-out duration-300"
              >
                <div className="h-48 w-full bg-emerald-950 rounded-t-3xl overflow-hidden">
                  <img src={product.img} className="my-2 h-45 mx-auto" alt="" />
                </div>
                <div className="p-5">
                  <h1 className="text-white font-bold text-xl">{product.name}</h1>
                  <h1 className="mt-3 text-lg text-emerald-300">{product.desc}</h1>
                  <div className="flex mt-15">
                    <h1 className="mr-auto text-white font-bold text-xl">
                      ₹{product.price}
                    </h1>
                    <h1 className="text-xl font-bold text-white">
                      {product.quantity}
                    </h1>
                  </div>
                </div>
                <button
                  onClick={() => toggleCart(product)}
                  className={`transition-all ease-in-out flex items-center justify-center rounded-full h-14 px-5 mr-3 ml-auto font-bold text-lg my-5 ${
                    inCart
                      ? "bg-emerald-400 text-black"
                      : "bg-emerald-300 text-black"
                  }`}
                >
                  {inCart ? (
                    <>
                      <FaOpencart className="mr-2" /> Added
                    </>
                  ) : (
                    <>
                      Add to Cart
                      <FaArrowAltCircleRight className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Footer/>
    </>
  );
}

export default Product;
