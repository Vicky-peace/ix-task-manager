import { Context } from "hono";
import { createAttachment } from "./attachment.service";

export const createAttachmentController = async (c: Context) => {
    try {
        const attachment = await c.req.json();
        const newAttachment = await createAttachment(attachment);
        if(!newAttachment){
            return c.json({message: 'Attachment not created'}, 400);
        }
        return c.json(newAttachment, 201);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}       