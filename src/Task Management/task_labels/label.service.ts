import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import {TaskLabels, TITaskLabels,TSTaskLabels} from "../../drizzle/schema";

export const createLabel = async (label: TITaskLabels) => {
    const newLabel = await db.insert(TaskLabels).values(label).returning().execute();
    return newLabel[0];
}