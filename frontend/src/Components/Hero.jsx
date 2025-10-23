
// import logo from '../assets/FoodBanner.png'
// import { FiTruck } from "react-icons/fi";
// import { LiaPercentSolid } from "react-icons/lia";
// import { MdOutlineShoppingCart,MdOutlineCardGiftcard  } from "react-icons/md";

// import { useState } from 'react';



// function Hero() {
//   const [active,setActive]=useState(false);


//   const changeColor=()=>{
//     setActive(!active);
    
//   }
// //   let body = document.querySelector("body");
// // body.style.backgroundColor="white";
//   return (
//     <>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-center ">
//     <div className="mx-[30px] my-[50px]">

//         <h4 className="h-8  mb-4 text-green-900 bg-emerald-100 w-[300px] rounded-[50px] ml-[50px] mt-[50px] text-center"><FiTruck className='my-auto'/>Free delivery on orders over ₹500</h4>
//         <h1 className='text-[50px] ml-[50px] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4' >Fresh <span className='font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-teal-700'>Groceries</span></h1>
//         <h1 className='text-[50px] ml-[50px] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4' >Delivered to Your Door</h1>
//         <h4 className='aa mx-13 mt-3 leading-tight'>Discover the freshest produce, top‐quality meats, and pantry</h4>
//         <h4 className='aa mx-13 mt- leading-tight'>essentials—all delivered within 30 minutes.</h4>
        
//               <img className="img shadow-inner block md:hidden mx-15 mb-10 " src={logo} alt="" />

//         <div onClick={changeColor}className={`flex search-box justify-left  ${active?"border-3 border-green-900":"border-2 border-green-900"}`}>

//         <input  className='p-3 focus:border-[#053a05] focus:ring-0 focus:ring-[#053a05]  ' type="text" placeholder='Search for fruits, vegeTables, meats, dairy...'/>
//          <button className="icon-container flex items-center justify-center  w-10 h-10 bg-green-800  rounded-full 
//                  transition-transform duration-300 hover:bg-green-900"><i className="fa-solid fa-magnifying-glass text-white py-4" /></button> 
//         </div>
//         <div className="flex CARDS ml-8">
//             <div className="ml-4 rounded-2xl h-18 w-70 place-items-center hover:shadow-2xl text-2xl border-1 md:h-[100px] md:w-[120px] md:place-content-center md:rounded-[20px] md:text-lg md:ml-[14px] md:text-center md:font-bold text-[#002147c1] bg-[rgb(207,173,129)] md:shadow-lg  md:hover:shadow-2xl"><FiTruck className='icon'/><h6>Fast Delivery</h6></div>
//             <div className="ml-4 rounded-2xl h-18 w-70 place-items-center hover:shadow-2xl text-2xl border-1 md:h-[100px] md:w-[120px] md:place-content-center md:rounded-[20px] md:text-lg md:ml-[14px] md:text-center md:font-bold text-[#002147c1] bg-[rgb(207,173,129)] md:shadow-lg  md:hover:shadow-2xl"><LiaPercentSolid className='icon' /><h6>Easy Returns</h6></div>
//          {/* </div>   
//             <div className="flex CARDS ml-8"> */}
//             <div className="ml-4 rounded-2xl h-18 w-70 place-items-center hover:shadow-2xl text-2xl border-1 md:h-[100px] md:w-[120px] md:place-content-center md:rounded-[20px] md:text-lg md:ml-[14px] md:text-center md:font-bold text-[#002147c1] bg-[rgb(207,173,129)] md:shadow-lg  md:hover:shadow-2xl"><MdOutlineShoppingCart className='icon' /><h6>Best Prices</h6></div>
//             <div className="ml-4 rounded-2xl h-18 w-70 place-items-center hover:shadow-2xl text-2xl border-1 md:h-[100px] md:w-[120px] md:place-content-center md:rounded-[20px] md:text-lg md:ml-[14px] md:text-center md:font-bold text-[#002147c1] bg-[rgb(207,173,129)] md:shadow-lg  md:hover:shadow-2xl"><MdOutlineCardGiftcard className='icon' /><h6>Daily Deals</h6></div>
//         </div>
        


//     </div>
//     <div  className='my-[50px]'>
//     <img  className="img shadow-inner md:block hidden mx-30 mb-10  " src={logo} alt="" />
//     </div>
//     </div>
//     </>
//   )
// }

// export default Hero

// src/components/Hero.jsx
import React, { useState } from "react";
import logo from "../assets/FoodBanner.png";
import { FiTruck } from "react-icons/fi";
import { LiaPercentSolid } from "react-icons/lia";
import { MdOutlineShoppingCart, MdOutlineCardGiftcard } from "react-icons/md";

export default function Hero() {
  const [active, setActive] = useState(false);
 const [searchTerm, setSearchTerm] = useState("");

 
  return (
    <section className="bg-gray-50 pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* LEFT: text, search, feature cards */}
          <div className="text-center lg:text-left">
            {/* badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
                <FiTruck className="text-lg" />
                Free delivery on orders over ₹500
              </div>
            </div>

            {/* headlines */}
            <h2 className="mt-6 font-extrabold text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Fresh{" "}
              <span className="font-serif italic text-teal-700 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Groceries
              </span>
            </h2>
            <h2 className="font-extrabold text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mt-1">
              Delivered to Your Door
            </h2>

            {/* subtext */}
            <p className="mt-4 text-gray-600 max-w-lg mx-auto lg:mx-0">
              Discover the freshest produce, top-quality meats, and pantry essentials—all delivered within 30
              minutes.
            </p>

            {/* search pill */}
            {/* <div className="mt-6 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Search for fruits, vegetables, meats, dairy..."
                  className="w-full rounded-full pl-4 pr-14 py-3 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-white shadow-sm"
                  onFocus={() => setActive(true)}
                  onBlur={() => setActive(false)}
                  
                />
                <button className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white shadow">
                  {/* search icon (svg to avoid extra packages) */}
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z" />
                  </svg>
                </button>
              </div>
            </div> */}  

            {/* feature cards: 2x2 grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow border border-gray-100">
                <FiTruck className="text-2xl text-emerald-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Fast Delivery</span>
              </div>

              <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow border border-gray-100">
                <MdOutlineShoppingCart className="text-2xl text-emerald-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Best Prices</span>
              </div>

              <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow border border-gray-100">
                <LiaPercentSolid className="text-2xl text-emerald-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Easy Returns</span>
              </div>

              <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow border border-gray-100">
                <MdOutlineCardGiftcard className="text-2xl text-emerald-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Daily Deals</span>
              </div>
            </div>

            {/* mobile image (shown only on small screens) */}
            <div className="mt-8 block lg:hidden">
              <img src={logo} alt="groceries" className="w-100 mx-auto h-100 rounded-2xl shadow-lg border-10  border-white" />
            </div>
          </div>

          {/* RIGHT: desktop hero image */}
          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-md rounded-xl overflow-hidden bg-white p-3 shadow-lg border-4 border-white">
              <img src={logo} alt="groceries" className="w-full h-80 object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
