import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";

import { sendCookies } from "../utils/features.js";



// export const getAllUsers = async (req, res) => {

//     try {
//         const users = await User.find();
//         res.status(200).send(users);
//     }
//     catch (err) {
//         res.status(400).send({ message: err });
//     }

// }


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");

        if (!user) { next(new ErrorHandler("Check Email or Password", 404)) };

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) { next(new ErrorHandler("Check Email or Password", 404)) };

        sendCookies(user, res, `Welcome back, ${user.name}`, 200);

    }
    catch (err) {
        next(err);
    }
};



export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) { next(new ErrorHandler("User Already Exists", 404)) };

        const hashedPass = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPass
        });

        sendCookies(user, res, "Registered Successfully", 201);

    }
    catch (err) {
        next(err);
    }
};



export const getMyProfile = (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        })
    }
    catch (err) {
        next(err);
    }
};



export const logout = (req, res) => {
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        }).json({
            success: true,
            message: "user logout successfully!"
        })
    }
    catch (err) {
        next(err);
    }
};



// export const updateUser = async (req, res) => {
//     try {
//         const id = req.params.id;
//         console.log(id);
//         let user = req.user;
//         res.json({
//             user,
//         })
//         const { name, email, password } = req.body;
//         // let user = await User.findById({ _id:id });
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "check email or password"
//             })
//         }
//         user = {
//             name,
//             email,
//             password
//         }

//         res.status(200).json({
//             success: true,
//             user,
//             message: "User updated successfully"
//         })
//     }
//     catch (err) {
//         res.status(500).send({ message: err });
//     }
// }



// export const deleteUser = async (req, res) => {
//     try {
//         const id = req.params.id;
//         let user = await User.findById({ _id: id });
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "check email or password"
//             })
//         }

//     }
//     catch (err) {
//         res.status(500).send({ message: err });
//     }
// }








