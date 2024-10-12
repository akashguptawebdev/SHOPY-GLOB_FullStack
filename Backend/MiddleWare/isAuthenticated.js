import jwt from "jsonwebtoken";
import { user } from "../Model/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.id = decode.userId;

    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res , next) =>{
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "user not authenticated" });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.id = decode.userId;

    const userDetails = await user.findById(decode.userId)
    if (!userDetails) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if(userDetails.role != "admin"){
      return res.status(401).json({ message: "Access denied user not authenticated" });
    }

    next();
  } catch (error) {
    console.log(error);
  }

}
