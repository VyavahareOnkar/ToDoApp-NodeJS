import ErrorHandler from "../middlewares/error.js"
import { Task } from "../models/taskSchema.js";

export const allTask = async (req, res, next) => {

    try {
        const userid = req.user._id;

        const tasks = await Task.find({ user: userid });

        res.status(200).json({
            success: true,
            tasks,
            message: "all tasks are fetched successfully"
        })

    } catch (error) {
        next(error);
    }
}



export const addTask = async (req, res, next) => {

    try {
        const { title, description } = req.body;

        const newTask = await Task.create({
            title,
            description,
            user: req.user
        });

        res.status(201).json({
            success: true,
            newTask,
            message: "Task added successfully"
        })
    }
    catch (error) {
        next(error);
    }
}


export const updateTask = async (req, res, next) => {

    try {
        const id = req.params._id;
        const task = await Task.findById(id);

        if (!task) { return next(new ErrorHandler("Invalid Task", 404)) };

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(201).json({
            success: true,
            task,
            message: "Task added successfully"
        })
    }
    catch (error) {
        next(error);
    }
}



export const deleteTask = async (req, res, next) => {

    try {
        let { _id } = req.params;

        let task = await Task.findById(_id);

        if (!task) { return next(new ErrorHandler("Invalid Task", 404)) };

        task.deleteOne();

        res.status(201).json({
            success: true,
            task,
            message: "Task deleted successfully"
        })
    }
    catch (error) {
        next(error);
    }
}




