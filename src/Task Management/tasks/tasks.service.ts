import { db } from "../../drizzle/db";
import { Tasks, TSTasks,TITasks } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const createTask = async (task: TITasks) => {
    const newTask = await db.insert(Tasks).values(task).returning().execute();
    return newTask[0];
}

export const updateTask = async (task_id: number, task: Partial<TITasks>) => {
    await db.update(Tasks).set(task).where(eq(Tasks.task_id, task_id)).execute();
    return 'Task updated successfully';
}

export const deleteTask = async (task_id: number) => {
    await db.delete(Tasks).where(eq(Tasks.task_id, task_id)).execute();
    return 'Task deleted successfully';
};

export const getTaskById = async (task_id: number): Promise<TSTasks | undefined> => {
    return await db.query.Tasks.findFirst({
        where: eq(Tasks.task_id, task_id)
    });
};


export const getAllTasks = async (limit?: number): Promise<TSTasks[] | null> => {
    if(limit){
        return await db.query.Tasks.findMany({limit: limit})
    }
    return await db.query.Tasks.findMany();
}