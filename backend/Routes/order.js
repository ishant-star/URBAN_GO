import express from "express";
import Order from "../Models/Order.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

// Generate unique order number
const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD${timestamp.slice(-6)}${random}`;
};

// Create new order (Protected route)
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { customerInfo, items, pricing, paymentMethod } = req.body;
        const userId = req.user.userId;

        // Validate required fields
        if (!customerInfo || !items || !pricing || !paymentMethod) {
            return res.status(400).json({ 
                message: "Missing required fields: customerInfo, items, pricing, paymentMethod" 
            });
        }

        // Validate items array
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ 
                message: "Items array is required and cannot be empty" 
            });
        }

        // Generate unique order number
        let orderNumber;
        let isUnique = false;
        while (!isUnique) {
            orderNumber = generateOrderNumber();
            const existingOrder = await Order.findOne({ orderNumber });
            if (!existingOrder) {
                isUnique = true;
            }
        }

        // Create new order
        const newOrder = new Order({
            userId,
            customerInfo: {
                name: customerInfo.name,
                email: customerInfo.email,
                phone: customerInfo.phone,
                address: customerInfo.address,
                notes: customerInfo.notes || "",
            },
            items: items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.qual || item.quantity || 1,
                img: item.img,
            })),
            pricing: {
                subtotal: pricing.subtotal,
                tax: pricing.tax,
                total: pricing.total,
            },
            paymentMethod,
            orderNumber,
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order placed successfully!",
            order: {
                orderNumber: newOrder.orderNumber,
                total: newOrder.pricing.total,
                status: newOrder.status,
                createdAt: newOrder.createdAt,
            }
        });

    } catch (err) {
        console.error("Order creation error:", err);
        res.status(500).json({ 
            error: "Failed to place order",
            details: err.message 
        });
    }
});

// Get user's orders (Protected route)
router.get("/", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .select('-userId'); // Exclude userId from response

        res.status(200).json({
            message: "Orders retrieved successfully",
            orders
        });

    } catch (err) {
        console.error("Get orders error:", err);
        res.status(500).json({ 
            error: "Failed to retrieve orders",
            details: err.message 
        });
    }
});

// Get specific order by order number (Protected route)
router.get("/:orderNumber", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { orderNumber } = req.params;
        
        const order = await Order.findOne({ 
            orderNumber, 
            userId 
        }).select('-userId');

        if (!order) {
            return res.status(404).json({ 
                message: "Order not found" 
            });
        }

        res.status(200).json({
            message: "Order retrieved successfully",
            order
        });

    } catch (err) {
        console.error("Get order error:", err);
        res.status(500).json({ 
            error: "Failed to retrieve order",
            details: err.message 
        });
    }
});

export default router;