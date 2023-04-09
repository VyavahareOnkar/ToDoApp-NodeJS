import express from "express";

const router = express.Router();

import { addTask, updateTask, deleteTask, allTask } from "../controllers/taskController.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.post("/addTask", isAuthenticated, addTask);
router.get("/all", isAuthenticated, allTask);

router.route("/:_id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export default router