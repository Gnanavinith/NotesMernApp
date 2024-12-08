// routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // Ensure this path is correct
import jwt from "jsonwebtoken";
import middleware from "../Middleware/middleware.js"

const router = express.Router();

// User registration route
router.post("/register", async (req, res) => {
  try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
          return res.status(400).json({ success: false, message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ success: false, message: "User already exists" });
      }

      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword });

      return res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
  } catch (error) {
      console.error("Error during registration:", error); // Log error details
      return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user already exists
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User Not exists" });
      }

     
  
      const checkPassword=await bcrypt.compare(password,user.password)
       
      if(!checkPassword){
        return res.status(401).json({ success: false, message: "Invalid Password" });
      }
      const token =jwt.sign({id:user._id},"secretkeyofnoteapp@123",{expiresIn:"1h"})
      return res
        .status(200)
        .json({ success: true,token,user:{name:user.name}, message: "Login successfully" });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: " Error in Login" });
    }
  });


  router.get("/verify",middleware,async(req,res)=>{
    return res.status(200).json({success:true ,user:req.user})
  })

export default router; // Default export
