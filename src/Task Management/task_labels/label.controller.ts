import { Context } from "hono";
import { createLabel } from "./label.service";

export const createLabelController = async (c: Context) => {
    try {
        const label = await c.req.json();
        const newLabel = await createLabel(label);
        if(!newLabel){
            return c.json({message: 'Label not created'}, 400);
        }
        return c.json(newLabel, 201);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}