import express from "express";
import Contact from "../Models/Contact.js";

const router = express.Router();

router.post('/',async(req,res)=>{
    try {
        const{name,email,telephone,inquiry,message}=req.body;
        const newContact = new Contact({name,email,telephone,inquiry,message});
        await newContact.save();
    
        res.status(201).json({ message: "✅ Contact saved successfully", data: newContact });
    
        // res.json({ message: "✅ Contact saved Successfully", data:newContact });

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "❌ Failed to save the Contact", details: err.message });
      }

});






























export default router;