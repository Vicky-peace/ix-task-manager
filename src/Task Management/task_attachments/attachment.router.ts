import { Hono } from "hono";
import { createAttachmentController } from "./attachment.controller";

export const attachmentRouter = new Hono();

attachmentRouter.post('/attachments', createAttachmentController);