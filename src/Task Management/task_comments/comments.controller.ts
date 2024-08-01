import { Context } from "hono";
import { createComment,updateComment,deleteComment,getCommentsByTaskId,getComments } from "./comments.services";

export const createCommentController = async (c: Context) => {
    try {
        const comment = await c.req.json();
        const newComment = await createComment(comment);
        if(!newComment){
            return c.json({message: 'Comment not created'}, 400);
        }
        return c.json(newComment, 201);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const updateCommentController = async (c: Context) =>{
    const commentId = Number(c.req.param('id'));
    const comment = await c.req.json();
    try {
        const updatedComment = await updateComment(commentId, comment);
        if(!updatedComment) return c.json({message: 'Comment not updated'}, 400);
        return c.json({message: updatedComment}, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const deleteCommentController = async (c: Context) => {
    try {
        const commentId = Number(c.req.param('id'));
        const deletedComment = await deleteComment(commentId);
        if(!deletedComment) return c.json({message: 'Comment not deleted'}, 400);
        return c.json({message: deletedComment}, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const getCommentsByTaskIdController = async (c: Context) => {
    try {
        const taskId = Number(c.req.param('id'));
        const comments = await getCommentsByTaskId(taskId);
        if(!comments) return c.json({message: 'Comments not found'}, 404);
        return c.json(comments, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const getCommentsController = async (c: Context) => {
    try {
        const comments = await getComments();
        if(!comments) return c.json({message: 'Comments not found'}, 404);
        return c.json(comments, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}