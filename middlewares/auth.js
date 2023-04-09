import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {

    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "token doesn't exist please login"
            })
        }

        const decodedData = jwt.verify(token, process.env.SECRET_KEY);
        
        if (decodedData) {
            req.user = await User.findById(decodedData._id);
        }

        next();
        
    } catch (error) {
       next(error);
    }
}