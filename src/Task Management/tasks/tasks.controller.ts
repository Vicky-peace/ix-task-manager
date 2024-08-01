import { Context } from "hono";
import { createTask,updateTask,deleteTask,getAllTasks, getTaskById } from "./tasks.service";

export const createTaskController = async (c: Context) => {
   try {
    const task = await c.req.json();
       //convert date strings to date objects
       if(task.due_date){
        task.due_date = new Date(task.due_date);
    }
  
    const newTask = await createTask(task);
    if(!newTask){
        return c.json({message: 'Task not created'}, 400);
    }
    return c.json(newTask, 201);
   } catch (error: any) {
       return c.json({error: error.message}, 500)
    
   }

}

export const updateTaskController = async (c: Context) =>{
    const taskId = Number(c.req.param('id'));
        const task = await c.req.json();
    try {

         //convert date strings to date objects
         if(task.due_date){
            task.due_date = new Date(task.due_date);
        }
      
        
        const updatedTask = await updateTask(taskId, task);
        if(!updatedTask) return c.json({message: 'Task not updated'}, 400);
        return c.json({message: updatedTask}, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const deleteTaskController = async (c: Context) => {
    try {
        const taskId = Number(c.req.param('id'));
        const deletedTask = await deleteTask(taskId);
        if(!deletedTask) return c.json({message: 'Task not deleted'}, 400);
        return c.json({message: deletedTask}, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const getTaskByIdController = async (c: Context) => {
    try {
        const taskId = Number(c.req.param('id'));
        const task = await getTaskById(taskId);
        if(!task) return c.json({message: 'Task not found'}, 404);
        return c.json(task, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const getAllTasksController = async (c: Context) => {
    try {
        const limit = Number(c.req.param('limit'));
        const tasks = await getAllTasks(limit);
        if(!tasks) return c.json({message: 'Tasks not found'}, 404);
        return c.json(tasks, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}