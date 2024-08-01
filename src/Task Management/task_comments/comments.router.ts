import { Hono } from "hono";
import { createCommentController,updateCommentController,deleteCommentController,getCommentsByTaskIdController,getCommentsController } from "./comments.controller";

export const commentsRouter = new Hono();

commentsRouter.post('/comments', createCommentController);
commentsRouter.put('/comments/:id', updateCommentController);
commentsRouter.delete('/comments/:id', deleteCommentController);
commentsRouter.get('/comments/:id', getCommentsByTaskIdController);
commentsRouter.get('/comments', getCommentsController);