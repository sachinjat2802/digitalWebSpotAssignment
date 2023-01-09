import { Router } from "express";
import {taskController} from "./controller.js"
export const taskRouter = Router();

taskRouter.post('/createTask', taskController.createTask);
taskRouter.get('/getTask',taskController.getTasks);
taskRouter.put("/updateTask/:id",taskController.updateTask);
taskRouter.delete("/deleteTask/:id",taskController.deleteTask);


