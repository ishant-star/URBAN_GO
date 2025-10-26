import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./Routes/Contact.js"; // Make sure this path is correct
import loginRoutes from "./Routes/login.js"
import orderRoutes from "./Routes/order.js"
import paymentRoutes from "./Routes/payment.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const db = process.env.MONGO_URI;

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "https://urban-go-tawny.vercel.app",
      "http://localhost:3000",
      "http://localhost:5173"
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json()); // Important to parse JSON body

// Connect to MongoDB
mongoose.connect(db)
.then(() => {
    console.log("✅ MongoDB is Connected");
})
.catch((err) => {
    console.error("❌ Database connection error:", err);
});

// Health check endpoint for deployment
app.get("/", (req, res) => {
    res.json({
        message: "UrbanGo Backend API is running!",
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use("/contact", contactRoutes);
app.use("/login",  loginRoutes);
app.use("/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
// Start server
app.listen(port, () => {
    console.log(`Backend is running on port number ${port}`);
});