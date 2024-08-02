import { db } from "../../drizzle/db";
import { eq } from "drizzle-orm";

import { TaskAttachments,TITaskAttachments,TSTaskAttachments } from "../../drizzle/schema";

export const createAttachment = async (attachment: TITaskAttachments) => {
    const newAttachment = await db.insert(TaskAttachments).values(attachment).returning().execute();
    return newAttachment[0];
}