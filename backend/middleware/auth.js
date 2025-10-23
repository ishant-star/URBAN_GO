import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    console.log("🔐 Auth middleware - Request URL:", req.originalUrl);
    console.log("🔐 Auth middleware - Headers:", req.headers);
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    console.log("🔐 Auth Header:", authHeader);
    console.log("🔐 Extracted Token:", token ? `${token.substring(0, 20)}...` : 'None');

    if (!token) {
        console.log("❌ Auth middleware - No token provided");
        return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("❌ Auth middleware - Token verification failed:", err.message);
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        
        console.log("✅ Auth middleware - Token verified for user:", {
            userId: user.userId,
            email: user.email,
            name: user.name
        });
        
        req.user = user;
        next();
    });
};

export default authenticateToken;