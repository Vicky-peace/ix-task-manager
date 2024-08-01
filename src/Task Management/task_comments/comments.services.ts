import { db } from "../../drizzle/db";
import { eq } from "drizzle-orm";
import { TaskComments, TSTaskComments, TITaskComments } from "../../drizzle/schema";

export const createComment = async (comment: TITaskComments) => {
    const newComment = await db.insert(TaskComments).values(comment).returning().execute();
    return newComment[0];
}

export const updateComment = async (comment_id: number, comment: Partial<TITaskComments>) => {
    await db.update(TaskComments).set(comment).where(eq(TaskComments.comment_id, comment_id)).execute();
    return 'Comment updated successfully';
}

export const deleteComment = async (comment_id: number) => {
    await db.delete(TaskComments).where(eq(TaskComments.comment_id, comment_id)).execute();
    return 'Comment deleted successfully';
}

export const getCommentsByTaskId = async (task_id: number): Promise<TSTaskComments[] | null> => {
    return await db.query.TaskComments.findMany({
        where: eq(TaskComments.task_id, task_id)
    });
}

export const getComments = async (limit?: number): Promise<TSTaskComments[] | null> => {
    if(limit){
        return await db.query.TaskComments.findMany({limit: limit});
    }
    return await db.query.TaskComments.findMany();
}