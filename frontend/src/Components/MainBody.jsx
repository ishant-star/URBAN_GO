import { useState } from "react";
import { GiShrimp,GiAppleCore, GiMilkCarton, GiBroccoli, GiWineGlass, GiPopcorn, GiChickenLeg, GiCroissant } from "react-icons/gi";
import { FaThList } from "react-icons/fa";
import products from "../Items/Item";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";


export default function MainBody() {



  const [category, setCategory] = useState("Vegetables");

  const filteredProducts = products.filter(
    (item) => category === "All" || item.category === category
  );

  return (
    <>
      {/* mobile bar start */}
             <div className="md:hidden overflow-x-auto scrollbar-hide my-5 ">
                <ul className="space-y-5 mt-5  flex flex-nowrap">
          <li className={`mr-5 flex-shrink-0 mx-auto text-1xl text-slate-500 h-12 place-content-center w-25 rounded-full  ${category=="All" ? "bg-emerald-500 text-white border-2  " : "bg-white  text-emerald-500 border-2 border-emerald-400 "}`}><button onClick={() => setCategory("All")}                className="w-full mx-5 text-left flex "> All Items</button></li>
          <li className={`mr-5 flex-shrink-0 mx-auto text-1xl text-slate-500 h-12 place-content-center w-20 rounded-full  ${category=="Fruits" ? "bg-emerald-500 text-white border-2  " : "bg-white  text-emerald-500 border-2 border-emerald-400 "}`}><button onClick={() => setCategory("Fruits")}          className="w-full mx-5 flex"> Fruits</button></li>
          <li className={`mr-5 flex-shrink-0 mx-auto text-1xl text-slate-500 h-12 place-content-center w-35 rounded-full  ${category=="Vegetables" ? "bg-emerald-500 text-white border-2  " : "bg-white  text-emerald-500 border-2 border-emerald-400 "}`}><button onClick={() => setCategory("Vegetables")}  className="w-full mx-8 text-left flex"> Vegetables</button></li>
          <li className={`mr-5 flex-shrink-0 mx-auto text-1xl text-slate-500 h-12 place-content-center w-20 rounded-full  ${category=="Dairy" ? "bg-emerald-500 text-white border-2  " : "bg-white  text-emerald-500 border-2 border-emerald-400 "}`}><button onClick={() => setCategory("Dairy")}            className="w-full mx-5 text-left flex"> Dairy</button></li>
          <li className={`mr-5 flex-shrink-0 mx-auto text-1xl text-slate-500 h-12 place-content-center w-25 rounded-full  ${category=="Beverages" ? "bg-emerald-500 text-white border-2  " : "bg-white  text-emerald-500 border-2 border-emerald-400 "}`}><button onClick={() => setCategory("Beverages")}    className="w-full mx-4 text-left flex ">Beverages</button></li>
          <li className={`mr-5 flex-shrink-0 mx-auto text-1xl text-slate-500 h-12 place-content-center w-20 rounded-full  ${category=="Snacks" ? "bg-emerald-500 text-white border-2  " : "bg-white  text-emerald-500 border-2 border-emerald-400 "}`}><button onClick={() => setCategory("Snacks")}          className="w-full mx-4 flex"> Snacks</button></li>
          <li className={`mr-5 flex-shrink-0 mx-auto text-1xl text-slate-500 h-12 place-content-center w-25 rounded-full  ${category=="Seafood" ? "bg-emerald-500 text-white border-2  " : "bg-white  text-emerald-500 border-2 border-emerald-400 "}`}><button onClick={() => setCategory("Seafood")}  className="w-full mx-5 text-left flex"> Seafood</button></li>
          <li className={`mr-5 flex-shrink-0 mx-auto text-1xl text-slate-500 h-12 place-content-center w-20 rounded-full  ${category=="Bakery" ? "bg-emerald-500 text-white border-2  " : "bg-white  text-emerald-500 border-2 border-emerald-400 "}`}><button onClick={() => setCategory("Bakery")}            className="w-full mx-4 text-left flex">Bakery</button></li>
          <li className={`mr-5 flex-shrink-0 mx-auto text-1xl text-slate-500 h-12 place-content-center w-20 rounded-full  ${category=="Meat" ? "bg-emerald-500 text-white border-2  " : "bg-white  text-emerald-500 border-2 border-emerald-400 "}`}><button onClick={() => setCategory("Meat")}                className="w-full mx-5 text-left flex "> Meat</button></li>
         
        </ul>

             </div>


         {/* mobile bar end */}
                 <div className="md:flex">

      {/* Sidebar */}

      <aside className="hidden md:block md:w-64 md:bg-emerald-600 md:text-white md:p-5 md:rounded-r-4xl">
        <h2  className="text-5xl drop-shadow-2xl italic font-bold mb-2 space-y- ">FreshCart</h2>
        <div className="bg-emerald-400 mx-auto mb-5 h-1 w-35 rounded-full " />
                                                                                                                                                 
        <ul className="space-y-3">
          <li className={`h-18 my-auto w-50 place-content-center text-[20px] rounded-2xl transition-all duration-300 ease-in-out hover:rounded-r-2xl hover:rounded-l-none hover:h-20 hover:w-51  mb-6 ${category=="All" ? "bg-white text-emerald-700 " : "bg-emerald-700  text-white hover-bg-white"}`}><button onClick={() => setCategory("All")}        className="w-full text-left flex "><div className="my-auto ml-6 mr-8 bg-emerald-400 rounded-full h-10 w-10 place-items-center "><FaThList     className="mt-[10px]"/></div> All Items</button></li>
          <li className={`h-18 my-auto w-50 place-content-center text-[20px] rounded-2xl transition-all duration-300 ease-in-out hover:rounded-r-2xl hover:rounded-l-none hover:h-20 hover:w-51  mb-6 ${category=="Fruits" ? "bg-white text-emerald-700 " : "bg-emerald-700  text-white hover-bg-white"}`}><button onClick={() => setCategory("Fruits")}     className="w-full text-left flex"><div className="my-auto ml-6 mr-8 bg-emerald-400 rounded-full h-10 w-10 place-items-center "><GiAppleCore  className="mt-[10px]"/></div> Fruits</button></li>
          <li className={`h-18 my-auto w-50 place-content-center text-[20px] rounded-2xl transition-all duration-300 ease-in-out hover:rounded-r-2xl hover:rounded-l-none hover:h-20 hover:w-51  mb-6 ${category=="Vegetables" ? "bg-white text-emerald-700 " : "bg-emerald-700  text-white hover-bg-white"}`}><button onClick={() => setCategory("Vegetables")} className="w-full text-left flex"><div className="my-auto ml-6 mr-8 bg-emerald-400 rounded-full h-10 w-10 place-items-center "><GiBroccoli   className="mt-[10px]"/></div> Vegetables</button></li>
          <li className={`h-18 my-auto w-50 place-content-center text-[20px] rounded-2xl transition-all duration-300 ease-in-out hover:rounded-r-2xl hover:rounded-l-none hover:h-20 hover:w-51  mb-6 ${category=="Dairy" ? "bg-white text-emerald-700 " : "bg-emerald-700  text-white hover-bg-white"}`}><button onClick={() => setCategory("Dairy")}      className="w-full text-left flex"><div className="my-auto ml-6 mr-8 bg-emerald-400 rounded-full h-10 w-10 place-items-center "><GiMilkCarton className="mt-[10px]"/></div> Dairy</button></li>
          <li className={`h-18 my-auto w-50 place-content-center text-[20px] rounded-2xl transition-all duration-300 ease-in-out hover:rounded-r-2xl hover:rounded-l-none hover:h-20 hover:w-51  mb-6 ${category=="Beverages" ? "bg-white text-emerald-700 " : "bg-emerald-700  text-white hover-bg-white"}`}><button onClick={() => setCategory("Beverages")}      className="w-full text-left flex"><div className="my-auto ml-6 mr-8 bg-emerald-400 rounded-full h-10 w-10 place-items-center "><GiWineGlass className="mt-[10px]"/></div> Beverages</button></li>
          <li className={`h-18 my-auto w-50 place-content-center text-[20px] rounded-2xl transition-all duration-300 ease-in-out hover:rounded-r-2xl hover:rounded-l-none hover:h-20 hover:w-51  mb-6 ${category=="Snacks" ? "bg-white text-emerald-700 " : "bg-emerald-700  text-white hover-bg-white"}`}><button onClick={() => setCategory("Snacks")}      className="w-full text-left flex"><div className="my-auto ml-6 mr-8 bg-emerald-400 rounded-full h-10 w-10 place-items-center "><GiPopcorn className="mt-[10px]"/></div> Snacks</button></li>
          <li className={`h-18 my-auto w-50 place-content-center text-[20px] rounded-2xl transition-all duration-300 ease-in-out hover:rounded-r-2xl hover:rounded-l-none hover:h-20 hover:w-51  mb-6 ${category=="Bakery" ? "bg-white text-emerald-700 " : "bg-emerald-700  text-white hover-bg-white"}`}><button onClick={() => setCategory("Bakery")}      className="w-full text-left flex"><div className="my-auto ml-6 mr-8 bg-emerald-400 rounded-full h-10 w-10 place-items-center "><GiShrimp className="mt-[10px]"/></div> SeaFood</button></li>
          <li className={`h-18 my-auto w-50 place-content-center text-[20px] rounded-2xl transition-all duration-300 ease-in-out hover:rounded-r-2xl hover:rounded-l-none hover:h-20 hover:w-51  mb-6 ${category=="Seafood" ? "bg-white text-emerald-700 " : "bg-emerald-700  text-white hover-bg-white"}`}><button onClick={() => setCategory("Seafood")}      className="w-full text-left flex"><div className="my-auto ml-6 mr-8 bg-emerald-400 rounded-full h-10 w-10 place-items-center "><GiCroissant className="mt-[10px]"/></div> Bakery</button></li>
          <li className={`h-18 my-auto w-50 place-content-center text-[20px] rounded-2xl transition-all duration-300 ease-in-out hover:rounded-r-2xl hover:rounded-l-none hover:h-20 hover:w-51  mb-6 ${category=="Meat" ? "bg-white text-emerald-700 " : "bg-emerald-700  text-white hover-bg-white"}`}><button onClick={() => setCategory("Meat")}      className="w-full text-left flex"><div className="my-auto ml-6 mr-8 bg-emerald-400 rounded-full h-10 w-10 place-items-center "><GiChickenLeg className="mt-[10px]"/></div> Meat</button></li>

        </ul>
      </aside>

      {/* Products */}
      <main className="flex-1 p-6">
        <h2 className="text-center text-5xl font-serif font-semibold text-green-600 mb-6">
          Best {category}
          <div className="bg-emerald-400 h-1 rounded-full w-55 mb-3 m-auto"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  ">
          {filteredProducts.slice(0,8).map((product) => (
              <div key={product.id} className="bg-white shadow-lg rounded-xl overflow-hidden p-4 hover:scale-105  transition-all ease-in-out duration-300 hover:shadow-emerald-700 hover:shadow-lg min-h-90">
              <img src={product.img} alt={product.name} className="h-50 mx-auto object-contain  " /><hr /><hr />
              <h3 className="text-center mt-2 text-2xl font-semibold">{product.name}</h3>
              <div className="flex justify-between items-center mt-2">
              <span className="text-green-600 text-2xl font-bold">₹{product.price}.00</span>
              <div className="text-emerald-500 font-bold text-2xl px-3 py-1 rounded-full">
                  {product.quantity}
                </div>
              </div>
            </div>
          ))}


          


        </div>
        <Link to="/product">
         <div className="h-15 mt-10 w-80 mx-auto place-content-center rounded-4xl text-2xl font-bold text-white bg-gradient-to-r from-emerald-400 to-emerald-300  " >
          <h1 className="flex place-content-center"
          >
            View All Products <IoIosArrowForward  className="my-auto mt-1.5  "/>
      
             
             </h1></div></Link>
      </main>
    </div>
          </>
  );
}
