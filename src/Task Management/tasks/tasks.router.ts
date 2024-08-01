import { Hono } from "hono";
import { createTaskController,updateTaskController,deleteTaskController,getAllTasksController, getTaskByIdController } from "./tasks.controller";
import { zValidator } from "@hono/zod-validator";
import { taskSchema } from "../../validator";

export const taskRouter = new Hono();

taskRouter.post('/tasks', zValidator('json',taskSchema),createTaskController)
taskRouter.put('/tasks/:id', zValidator('json', taskSchema), updateTaskController)
taskRouter.delete('/tasks/:id', deleteTaskController)
taskRouter.get('/tasks/:id', getTaskByIdController)
taskRouter.get('/tasks', getAllTasksController)