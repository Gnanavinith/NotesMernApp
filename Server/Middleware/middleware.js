import jwt from "jsonwebtoken";
import User from "../models/User.js";

const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Received Token:", token);

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, "secretkeyofnoteapp@123");
    console.log("Decoded Payload:", decoded);

    const user = await User.findById(decoded.id);
    console.log("User Found:", user);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = { name: user.name, id: user._id };
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error: Authentication failed" });
  }
};


export default middleware;
