
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
export const sendCookies = (user, res, message, statusCode = 200) => {

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    console.log("token in sendCookies", token);

    res.status(statusCode).cookie("token", token, {
        expires: new Date(Date.now() + 15 * 60 * 1000),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success: true,
        message
    })

}