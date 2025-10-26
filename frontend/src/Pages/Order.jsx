import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../Components/Nav'
import { IoPersonOutline } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";
import { FaTruck } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StripePayment from '../Components/StripePayment';

function Order() {
  const navigate = useNavigate();
  const [CartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);
  console.log(CartItems);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [money, setMoney] = useState(0);
  const [tItem, settItem] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showStripePayment, setShowStripePayment] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    payment: 'cod'
  });

  // 🧮 Quantity state
  const [quantities, setQuantities] = useState(
    CartItems.reduce((acc, item) => {
      acc[item.id] = 1; // default quantity 1
      return acc;
    }, {})
  );

  // 🧠 Calculate total price, tax, and grand total
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

  // 🧮 Total items count
  useEffect(() => {
    settItem(CartItems.length);
  }, [CartItems]);

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to place an order!");
      navigate("/login");
      return;
    }

    // Pre-fill user data if available
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to place an order!");
        navigate("/login");
        return;
      }

      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.address) {
        toast.error("Please fill in all required fields!");
        setLoading(false);
        return;
      }

      // Validate cart items
      if (!CartItems || CartItems.length === 0) {
        toast.error("Your cart is empty!");
        navigate("/product");
        return;
      }

      // Check payment method
      if (formData.payment === 'online') {
        // Show Stripe payment form for online payment
        setShowStripePayment(true);
        setLoading(false);
        return;
      }

      // Handle COD payment - direct order creation
      await processCODOrder();

    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  // Process COD order
  const processCODOrder = async () => {
    try {
      const token = localStorage.getItem("authToken");
      
      // Prepare order data
      const orderData = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes
        },
        items: CartItems,
        pricing: {
          subtotal: price,
          tax: tax,
          total: money
        },
        paymentMethod: formData.payment
      };

      // Send order to backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok) {
        // Clear localStorage
        localStorage.removeItem("cartItems");
        
        // Show success message
        toast.success(`Order placed successfully! Order #${data.order.orderNumber}`);
        
        // Reset form and cart
        setCartItems([]);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          notes: '',
          payment: 'cod'
        });

        // Redirect to home page after a delay
        setTimeout(() => {
          navigate("/");
        }, 3000);

      } else {
        toast.error(data.message || "Failed to place order. Please try again.");
      }

    } catch (error) {
      console.error("COD order error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle successful Stripe payment
  const handleStripePaymentSuccess = async (paymentIntent) => {
    try {
      const token = localStorage.getItem("authToken");
      
      // Prepare order data with payment info
      const orderData = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes
        },
        items: CartItems,
        pricing: {
          subtotal: price,
          tax: tax,
          total: money
        },
        paymentMethod: 'online',
        stripePaymentId: paymentIntent.id
      };

      // Send order to backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok) {
        // Clear localStorage
        localStorage.removeItem("cartItems");
        
        // Show success message
        toast.success(`Payment successful! Order #${data.order.orderNumber}`);
        
        // Reset form and cart
        setCartItems([]);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          notes: '',
          payment: 'cod'
        });
        setShowStripePayment(false);

        // Redirect to home page after a delay
        setTimeout(() => {
          navigate("/");
        }, 3000);

      } else {
        toast.error(data.message || "Failed to save order after payment.");
      }

    } catch (error) {
      console.error("Order creation after payment error:", error);
      toast.error("Payment successful but failed to save order. Please contact support.");
    }
  };

  // Handle Stripe payment error
  const handleStripePaymentError = (error) => {
    console.error("Stripe payment error:", error);
    toast.error(`Payment failed: ${error}`);
    setShowStripePayment(false);
  };

  return (
    <>
      {/* NAVIGATION BAR */}
      <Nav />
      {/* NAVIGATION BAR END */}

      <div className="bg-gradient-to-r from-emerald-950 to-emerald-950 p-20 min-h-screen w-full font-mono">
        <h1 className='text-emerald-100 text-4xl font-bold mt-5'>Checkout</h1>
        <h1 className='text-emerald-400 mt-3 text-lg'>Complete your purchase with secure checkout</h1>

        <div className="sm:flex">
          {/* CARD 1 */}
          <form onSubmit={handleSubmit} className='w-full sm:flex gap-10'>
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-900 border mt-5 border-emerald-500 sm:w-1/2 rounded-3xl p-5 text-emerald-400 text-xl font-bold">
              <div className="flex text-2xl ">
                <IoPersonOutline className='mt-1' />
                <h1 className='ml-1 text-emerald-100'>Customer Information</h1>
              </div>
              <div className="h-[1px] mb-3 mt-2 rounded-2xl w-full bg-emerald-500"></div>

              <label htmlFor="name">Full Name<sup>*</sup></label><br />
              <input
                className='border border-emerald-500 rounded-lg mt-1 mb-4 w-full p-3 placeholder:font-semibold outline-none text-white placeholder:text-emerald-600 bg-transparent'
                type="text"
                name="name"
                id="name"
                placeholder='Enter your Full Name'
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="email">Email Address<sup>*</sup></label><br />
              <input
                className='border border-emerald-500 rounded-lg mt-1 mb-4 w-full p-3 placeholder:font-semibold outline-none text-white placeholder:text-emerald-600 bg-transparent'
                type="email"
                name="email"
                id="email"
                placeholder='xyz@gmail.com'
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="phone">Phone Number<sup>*</sup></label><br />
              <input
                className='border border-emerald-500 rounded-lg mt-1 mb-4 w-full p-3 placeholder:font-semibold outline-none text-white placeholder:text-emerald-600 bg-transparent'
                type="tel"
                name="phone"
                id="phone"
                placeholder='10-digit Phone Number'
                value={formData.phone}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="address">Delivery Address<sup>*</sup></label><br />
              <textarea
                className='border border-emerald-500 rounded-lg mt-1 mb-4 w-full p-3 placeholder:font-semibold outline-none text-white placeholder:text-emerald-600 bg-transparent'
                name="address"
                id="address"
                placeholder='Full address including Landmark'
                value={formData.address}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="notes">Delivery Notes</label><br />
              <textarea
                className='border border-emerald-500 rounded-lg mt-1 mb-4 w-full p-3 placeholder:font-semibold outline-none text-white placeholder:text-emerald-600 bg-transparent'
                name="notes"
                id="notes"
                placeholder='Special instruction, gate code, etc.'
                value={formData.notes}
                onChange={handleInputChange}
              />

              <div className="flex text-2xl">
                <CiCreditCard1 className='mt-1 mr-1' />
                <h1 className='text-emerald-200'>Payment Method</h1>
              </div>
              <div className="h-[1px] mb-3 mt-2 rounded-2xl w-full bg-emerald-500"></div>

              <div className="text-2xl border-1 rounded-2xl">
                <input
                  type="radio"
                  name="payment"
                  id="cod"
                  value="cod"
                  checked={formData.payment === 'cod'}
                  onChange={handleInputChange}
                  className="scale-150 accent-blue-900 ml-3"
                />
                <label className='ml-2 text-emerald-200' htmlFor="cod">Cash on Delivery</label><br />
                <h1 className='text-lg text-emerald-400 font-medium ml-8.5 -translate-y-2'>Pay on delivery</h1>
              </div>

              <div className="text-2xl border-1 rounded-2xl mt-5">
                <input
                  type="radio"
                  name="payment"
                  id="online"
                  value="online"
                  checked={formData.payment === 'online'}
                  onChange={handleInputChange}
                  className="scale-150 accent-blue-900 ml-3"
                />
                <label className='ml-2 text-emerald-200' htmlFor="online">Online Payment</label><br />
                <h1 className='text-lg text-emerald-400 font-medium ml-8.5 -translate-y-2'>Pay now via card/UPI</h1>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-900 border mt-5 border-emerald-500 sm:w-1/2 rounded-3xl p-5 text-emerald-400 text-xl font-bold">
              <div className="flex text-2xl">
                <BsBoxSeam className='mt-1' />
                <h1 className='ml-1 text-emerald-100'>Order Summary</h1>
              </div>
              <div className="h-[1px] mb-3 mt-2 rounded-2xl w-full bg-emerald-500"></div>
              <h1>Your Items ({tItem})</h1>

              <div className="h-[400px] overflow-y-scroll pr-2">
                {CartItems.map((object) => (
                  <div key={object.id} className="p-3 flex border-b border-emerald-700">
                    <img className='h-20 w-20 rounded-lg' src={object.img} alt={object.name} />
                    <div className="ml-5">
                      <h1 className='text-emerald-200'>{object.name}</h1>
                      <h1 className='mt-2 text-white font-semibold'>
                        ₹{object.price} × {object.qual}
                      </h1>
                    </div>
                    <h1 className='ml-auto text-white font-semibold mt-8'>
                      ₹{object.price * object.qual}
                    </h1>
                  </div>
                ))}
              </div>

              {/* PRICE SUMMARY */}
              <div className="mt-5 border-t border-emerald-500 pt-3 text-white">
                <div className="flex justify-between text-lg mb-2">
                  <span>Subtotal</span>
                  <span>₹{price}</span>
                </div>
                <div className="flex justify-between text-lg mb-2">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold mt-3">
                  <span>Total</span>
                  <span>₹{money.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  disabled={loading || CartItems.length === 0}
                  className={`w-full py-3 rounded-xl mt-5 font-semibold transition ${
                    loading || CartItems.length === 0
                      ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                      : 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:bg-gradient-to-r hover:from-emerald-500 hover:via-emerald-600 hover:to-teal-700 text-white'
                  }`}
                >
                  {loading ? 'Processing Order...' : 'Proceed to Payment'}
                </button >

                <h1 className='bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 bg-clip-text text-transparent font-medium text-sm mt-5 text-center mx-auto'>By placing your order you agree to our <a className='underline ' href="http://">Terms</a> and <a className='underline ' href="http://">Privacy</a></h1>
              </div>
            </div>
          </form>

        </div>
          <div className="bg-yellow-300/30 mt-10  rounded-2xl border border-yellow-200 text-yellow-500 font-semibold text-xl p-5 w-full">
            <h1 className='flex'><FaTruck className='mt-1 mr-2'/>Delivery Information</h1>
            <h1 className=''>We deliver within 30-45 minutes. Orders placed after 9 PM will be delivered the next morning.</h1>
          </div>

          {/* Stripe Payment Modal */}
          {showStripePayment && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-emerald-900 border border-emerald-500 rounded-3xl p-8 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-emerald-100">Complete Payment</h2>
                  <button
                    onClick={() => setShowStripePayment(false)}
                    className="text-emerald-400 hover:text-red-400 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg text-emerald-200 mb-2">Order Total: ₹{money.toFixed(2)}</h3>
                  <p className="text-emerald-400">
                    Items: {CartItems.map(item => item.name).join(', ')}
                  </p>
                </div>

                <StripePayment
                  orderData={{
                    customerInfo: {
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone,
                      address: formData.address,
                      notes: formData.notes
                    },
                    items: CartItems,
                    pricing: {
                      subtotal: price,
                      tax: tax,
                      total: money
                    }
                  }}
                  onPaymentSuccess={handleStripePaymentSuccess}
                  onPaymentError={handleStripePaymentError}
                />
              </div>
            </div>
          )}

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
      </div>
    </>
  )
}

export default Order
