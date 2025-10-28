import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";

function Summary() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        
        console.log("🔐 Summary - Checking authentication token...");
        console.log("🔐 Token exists:", !!token);
        console.log("🔐 Token preview:", token ? `${token.substring(0, 20)}...` : 'None');
        
        if (!token) {
          throw new Error("No authentication token found. Please login again.");
        }

        console.log("🔍 Fetching orders from payment API...");
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("📊 Payment API Response:", data);

        if (!response.ok) {
          // Check if it's a token signature error
          if (response.status === 403 && (data.message?.includes('Invalid') || data.message?.includes('expired'))) {
            console.log("🔄 Token signature invalid - clearing localStorage and redirecting to login");
            localStorage.removeItem("authToken");
            window.location.href = "/login";
            return;
          }
          // If payment API fails, try fallback to orders API
          console.log("⚠️ Payment API failed, trying orders API fallback...");
          
          const fallbackResponse = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const fallbackData = await fallbackResponse.json();
          console.log("📊 Orders API Response:", fallbackData);

          if (!fallbackResponse.ok) {
            if (fallbackResponse.status === 401) {
              localStorage.removeItem("authToken");
              throw new Error("Session expired. Please login again.");
            } else if (fallbackResponse.status === 403) {
              throw new Error("Access denied. Please check your permissions.");
            } else {
              throw new Error(fallbackData.error || fallbackData.message || "Failed to fetch orders");
            }
          }

          // Handle fallback response (orders API format)
          if (fallbackData.orders && Array.isArray(fallbackData.orders)) {
            console.log("✅ Orders loaded from fallback API:", fallbackData.orders.length);
            setOrders(fallbackData.orders);
          } else {
            console.warn("⚠️ Unexpected fallback response structure:", fallbackData);
            setOrders([]);
          }
        } else {
          // Handle successful payment API response
          if (data.success && data.data && data.data.orders) {
            console.log("✅ Orders loaded from payment API:", data.data.orders.length);
            setOrders(data.data.orders);
          } else if (data.data && Array.isArray(data.data.orders)) {
            // Handle case where orders array exists but success flag might be missing
            console.log("✅ Orders loaded (alternative format):", data.data.orders.length);
            setOrders(data.data.orders);
          } else if (Array.isArray(data)) {
            // Handle case where response is directly an array
            console.log("✅ Orders loaded (direct array):", data.length);
            setOrders(data);
          } else {
            console.warn("⚠️ Unexpected payment API response structure:", data);
            setOrders([]);
          }
        }
        
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-5 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-900 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading your orders...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-5">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
  <><Nav/>
    <div className="p-20 bg-emerald-950 h-screen">
      <h1 className="text-4xl sm:text-6xl text-center text-emerald-500 font-semibold mb-4">My <span className="text-emerald-200">Orders</span></h1>
      <h1 className="text-xl text-center text-emerald-500 mb-10">View your order history and track current orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg mb-4">No orders found</div>
          <p className="text-gray-400">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border">
          <table className="w-full border-collapse border  border-emerald-300 rounded-3xl">
            <thead className="bg-emerald-900 text-white h-15 text-lg">
              <tr>
                <th className="px-4 py-2">Order #</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                // Handle different order data structures
                const orderNumber = order.orderNumber || order._id || `ORDER-${index + 1}`;
                const createdAt = order.createdAt || order.updatedAt || new Date();
                const total = order.pricing?.total || order.total || 0;
                const status = order.status || 'pending';
                const itemsCount = order.items?.length || 0;
                
                return (
                  <tr
                  key={orderNumber}
                  className="h-15 bg-emerald-700 text-xl text-center border-t hover:bg-emerald-100 transition"
                  >
                    <td className="px-4 py-2 font-mono ">{orderNumber}</td>
                    <td className="px-4 py-2">
                      {new Date(createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-2 font-semibold">₹{Number(total).toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        status === 'delivered' ? 'bg-green-100 text-green-800' :
                        status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        status === 'preparing' ? 'bg-orange-100 text-orange-800' :
                        status === 'out_for_delivery' ? 'bg-purple-100 text-purple-800' :
                        status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="">
                        {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
              </>
  );
}

export default Summary;
