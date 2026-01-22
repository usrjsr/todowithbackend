import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const taskRouter = express.Router();

taskRouter.post("/new", isAuthenticated, newTask);
taskRouter.get("/mytasks", isAuthenticated, getMyTask);
taskRouter.put("/:id", isAuthenticated, updateTask);
taskRouter.delete("/:id", isAuthenticated, deleteTask);

export default taskRouter;
