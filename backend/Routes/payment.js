import express from "express";
import Stripe from "stripe";
import authenticateToken from "../middleware/auth.js";
import Order from "../Models/Order.js";

const router = express.Router();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
});

// Create payment intent for Stripe
router.post("/create-payment-intent", authenticateToken, async (req, res) => {
    try {
        const { amount, currency = "inr", items, customerInfo } = req.body;

        // Validate required fields
        if (!amount || !items || !customerInfo) {
            return res.status(400).json({
                error: "Missing required fields: amount, items, customerInfo"
            });
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects amount in smallest currency unit (paise for INR)
            currency: currency,
            metadata: {
                userId: req.user.userId,
                customerName: customerInfo.name,
                customerEmail: customerInfo.email,
                itemCount: items.length.toString(),
                items: JSON.stringify(items.map(item => ({
                    name: item.name,
                    quantity: item.qual || item.quantity || 1,
                    price: item.price
                })))
            },
            description: `Order for ${customerInfo.name} - ${items.length} items`,
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });

    } catch (error) {
        console.error("Stripe payment intent creation error:", error);
        res.status(500).json({
            error: "Failed to create payment intent",
            details: error.message
        });
    }
});

// Confirm payment and create order
router.post("/confirm-payment", authenticateToken, async (req, res) => {
    try {
        const { paymentIntentId, orderData } = req.body;

        // Retrieve payment intent from Stripe to verify payment
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({
                error: "Payment not completed",
                status: paymentIntent.status
            });
        }

        // Payment successful, create order in database
        // This would typically call the order creation logic
        res.status(200).json({
            message: "Payment confirmed successfully",
            paymentIntent: {
                id: paymentIntent.id,
                status: paymentIntent.status,
                amount: paymentIntent.amount / 100, // Convert back to main currency unit
            }
        });

    } catch (error) {
        console.error("Payment confirmation error:", error);
        res.status(500).json({
            error: "Failed to confirm payment",
            details: error.message
        });
    }
});


// Get user's order information for payment-related queries (Protected route)
router.get("/orders", authenticateToken, async (req, res) => {
    try {
        console.log("🔍 Payment route - Getting user orders");
        console.log("📋 User ID from token:", req.user.userId);
        
        const userId = req.user.userId;
        
        // Log the query being executed
        console.log("🔎 Querying orders for userId:", userId);
        
        // Get user-specific orders only
        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .select('-userId -__v'); // Exclude userId and version key from response
        
        console.log("📊 Found orders count:", orders.length);
        console.log("📦 Orders summary:", orders.map(order => ({
            orderNumber: order.orderNumber,
            status: order.status,
            total: order.pricing.total,
            createdAt: order.createdAt
        })));

        // Return user-specific order information
        res.status(200).json({
            success: true,
            message: "User order information retrieved successfully",
            data: {
                userId: userId,
                orderCount: orders.length,
                orders: orders.map(order => ({
                    orderNumber: order.orderNumber,
                    customerInfo: order.customerInfo,
                    items: order.items,
                    pricing: order.pricing,
                    paymentMethod: order.paymentMethod,
                    status: order.status,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt
                }))
            }
        });

    } catch (error) {
        console.error("❌ Payment route - Get orders error:", error);
        console.error("🔍 Error details:", {
            message: error.message,
            stack: error.stack,
            userId: req.user?.userId
        });
        
        res.status(500).json({
            success: false,
            error: "Failed to retrieve user order information",
            details: error.message
        });
    }
});

// Get specific order information by order number (Protected route)
router.get("/orders/:orderNumber", authenticateToken, async (req, res) => {
    try {
        console.log("🔍 Payment route - Getting specific order");
        console.log("📋 User ID:", req.user.userId);
        console.log("🔢 Order Number:", req.params.orderNumber);
        
        const userId = req.user.userId;
        const { orderNumber } = req.params;
        
        // Get specific order for the authenticated user only
        const order = await Order.findOne({
            orderNumber,
            userId
        }).select('-userId -__v');

        if (!order) {
            console.log("❌ Order not found for user");
            return res.status(404).json({
                success: false,
                message: "Order not found or you don't have permission to view this order"
            });
        }

        console.log("✅ Order found:", {
            orderNumber: order.orderNumber,
            status: order.status,
            total: order.pricing.total
        });

        res.status(200).json({
            success: true,
            message: "Order information retrieved successfully",
            data: {
                orderNumber: order.orderNumber,
                customerInfo: order.customerInfo,
                items: order.items,
                pricing: order.pricing,
                paymentMethod: order.paymentMethod,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            }
        });

    } catch (error) {
        console.error("❌ Payment route - Get specific order error:", error);
        console.error("🔍 Error details:", {
            message: error.message,
            orderNumber: req.params.orderNumber,
            userId: req.user?.userId
        });
        
        res.status(500).json({
            success: false,
            error: "Failed to retrieve order information",
            details: error.message
        });
    }
});

export default router;