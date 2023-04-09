import express from "express";
import userRouter from "./routers/userRouter.js"
import taskRouter from "./routers/taskRouter.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config({
    path:"./config.env"
})


export const app=express();

//Setting middlewares
app.use(express.json());   // This should be first before routes
// *************************************************************

app.use(cookieParser()); // The cookieParser middleware must be declared in app.js file before registering the routers.
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}));

// setting the middleware and adding the default route as /users
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);


app.get("/",(req,res)=>{
    res.send("Hi there!");
})

app.use(errorMiddleware);

