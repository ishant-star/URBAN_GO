import express from "express"
import Login from "../Models/Login.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = express.Router();

// Register route
router.post("/",async(req,res)=>{
    try{
        const {Name , email , password  , need}=req.body;

        // Validate required fields
        if (!Name || !email || !password) {
            return res.status(400).json({message:"Name, email, and password are required"});
        }

        // Check if user already exists
        const oldUser = await Login.findOne({email})

        if(oldUser){
            return res.status(400).json({message:"User Already Exists"});
        }

        // Hash password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newRegister = new Login({
            Name,
            email,
            password: hashedPassword,
            need
        });

        await newRegister.save();
        
        // Generate JWT token for immediate login after registration
        const token = jwt.sign(
            { userId: newRegister._id, email: newRegister.email, name: newRegister.Name },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({
            message:"REGISTER SUCCESSFULLY",
            token,
            user: {
                id: newRegister._id,
                name: newRegister.Name,
                email: newRegister.email
            }
        });
    }
    catch (err){
        console.error(err);
        res.status(400).json({ error: "❌ failed to Register " });
    }
})

// Login route
router.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({message:"Email and password are required"});
        }

        //Find User By Email
        const user = await Login.findOne({email});
        if (!user) return res.status(404).json({message:"User not Found"});

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(401).json({message:"Wrong Password"});

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, name: user.Name },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message:"Login Successfully",
            token,
            user: {
                id: user._id,
                name: user.Name,
                email: user.email
            }
        });
    }
    catch (err){
        console.log(err)
        res.status(500).json({error:"SERVER NOT WORKING"})
    }
})

export default router;