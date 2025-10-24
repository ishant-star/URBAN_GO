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
  origin: "https://urban-go-pi.vercel.app/"
}));
app.use(express.json()); // Important to parse JSON body

// Connect to MongoDB
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ MongoDB is Connected");
})
.catch((err) => {
    console.error("❌ Database connection error:", err);
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
