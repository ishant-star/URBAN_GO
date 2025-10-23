import React, { useState, useEffect } from 'react';
import Nav from '../Components/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegTrashCan } from 'react-icons/fa6';
import { IoIosArrowRoundBack } from "react-icons/io";

function Cart() {
  const navigate = useNavigate();

  const [CartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [money, setMoney] = useState(0);

  // State for quantities of each item
  const [quantities, setQuantities] = useState(
    CartItems.reduce((acc, item) => {
      acc[item.id] = item.qual || 1; // default to existing qual
      return acc;
    }, {})
  );

  // Increment quantity for a specific item
  const increment = (id) => {
    setQuantities({
      ...quantities,
      [id]: quantities[id] + 1,
    });
  };

  // Decrement quantity for a specific item
  const decrement = (id) => {
    setQuantities({
      ...quantities,
      [id]: quantities[id] > 1 ? quantities[id] - 1 : 1,
    });
  };

  // Update totals dynamically
  useEffect(() => {
    const total = CartItems.reduce(
      (acc, item) => acc + item.price * (quantities[item.id] || 1),
      0
    );
    setPrice(total);
    const taxt = (5 * total) / 100;
    setTax(taxt);
    setMoney(total + taxt);
  }, [CartItems, quantities]);

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = CartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    setQuantities({});
  };

  // ✅ Save updated quantities to localStorage when proceeding to payment
  const handleProceedToPayment = () => {
    const updatedCart = CartItems.map((item) => ({
      ...item,
      qual: quantities[item.id] || 1,
    }));
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    navigate("/order"); // redirect to Order page
  };

  return (
    <>
      <Nav />
      <div className="min-h-dvh w-full bg-gradient-to-r from-black from-45% via-white via-10% to-black to-45% py-20 font-mono">
        {CartItems.length === 0 && (
          <div className="min-h-80 md:w-[700px] md:mx-auto ml-20 mr-20 mt-10 rounded-3xl bg-gradient-to-r from-emerald-950 to-emerald-950 border-2 border-emerald-600">
            <div className="w-full place-content-center">
              <h1 className="text-7xl mt-8 text-center">🛒</h1>
              <h1 className="text-4xl text-emerald-200 text-center mt-3 font-semibold">
                Your Cart is Empty
              </h1>
              <h1 className="text-xl mt-3 font-semibold text-emerald-300 text-center">
                Looks like you haven't added anything yet.
              </h1>
              <Link to='/product'>
                <div className="h-12 w-50 font-bold text-lg rounded-full mx-auto bg-emerald-500 hover:scale-105 transition-all ease-in-out duration-300 hover:bg-emerald-600 mt-10 place-content-center">
                  <h1 className='text-center'>Browse Products</h1>
                </div>
              </Link>
            </div>
          </div>
        )}

        {CartItems.length >= 1 && (
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-10 px-10 mt-10">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <h1 className='text-emerald-100 text-5xl font-semibold text-center mx-auto mt-5'>Your Shopping Cart</h1>
              <h1 onClick={clearCart} className='w-35 lg:ml-30 mt-2 flex text-emerald-100 hover:text-red-500 cursor-pointer'>
                <FaRegTrashCan className='my-auto mr-2 ml-3'/>Clear Cart
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
                {CartItems.map((item) => (
                  <div key={item.id} className="min-h-100 rounded-3xl border-2 border-emerald-600">
                    <div className="bg-emerald-800 rounded-2xl h-25 w-25 mx-auto mt-10 place-content-center">
                      <img className='overflow-hidden h-15 w-15 mx-auto drop-shadow-2xl' src={item.img} alt="" />
                    </div>

                    <h1 className='text-emerald-100 text-2xl font-semibold text-center mt-5'>{item.name}</h1>
                    <h1 className='text-2xl text-emerald-400 text-center mt-5'>₹{item.price}</h1>

                    <div className="flex justify-between px-20 text-emerald-200 text-xl mt-5">
                      <button onClick={() => decrement(item.id)} className='cursor-pointer'>-</button>
                      <div className="text-white text-xl">{quantities[item.id]}</div>
                      <button onClick={() => increment(item.id)} className='cursor-pointer'>+</button>
                    </div>

                    <button onClick={() => removeItem(item.id)} className='text-red-600 text-xl mx-auto mt-5 cursor-pointer flex justify-center'>
                      <FaRegTrashCan className='text-lg mt-1 mr-2'/> Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 sm:mt-31">
              <div className="rounded-3xl w-full min-h-100 border-2 border-emerald-400 text-white p-8 bg-black/30">
                <h1 className='text-center text-3xl text-emerald-100 font-semibold'>Order Summary</h1>

                <div className="flex mt-4 text-xl font-semibold text-emerald-400">
                  <h1>Subtotal</h1>
                  <h1 className="text-emerald-200 ml-auto font-medium">₹{price}</h1>
                </div>

                <div className="flex mt-4 text-xl font-semibold text-emerald-400">
                  <h1>Shipping</h1>
                  <h1 className='text-emerald-200 ml-auto font-medium'>Free</h1>
                </div>

                <div className="flex mt-4 text-xl font-semibold text-emerald-400">
                  <h1>Taxes (5%)</h1>
                  <h1 className='text-emerald-200 ml-auto font-medium'>₹{tax}</h1>
                </div>

                <div className="bg-emerald-500 h-0.5 w-full mt-1 rounded-2xl"></div>

                <div className="flex mt-2 text-2xl font-semibold text-white">
                  <h1>Total</h1>
                  <h1 className='text-white ml-auto'>₹{money}</h1>
                </div>

                <div 
                  onClick={handleProceedToPayment}
                  className="h-15 font-bold text-xl w-60 mt-8 mx-auto rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black text-center py-3 cursor-pointer"
                >
                  Proceed To Payment
                </div>

                <Link to="/product">
                  <div className="mx-auto flex mt-5 w-52 text-xl text-emerald-500 justify-center">
                    <IoIosArrowRoundBack className='mt-1 text-lg font-bold'/> Continue Shopping
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
