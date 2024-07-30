import { Context } from "hono";
import { registerUser } from "./users.service";

export const register = async(c: Context) => {
    try {
        const user = await c.req.json();
        const message = await registerUser(user);
        return c.json({message}, 201);
    } catch (error: any) {
        return c.json({error: error.message}, 400);
    }
}