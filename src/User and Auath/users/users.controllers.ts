import { Context } from "hono";
import { registerUser, loginUser,getUsersService } from "./users.service";

export const register = async(c: Context) => {
    try {
        const user = await c.req.json();
        const message = await registerUser(user);
        return c.json({message}, 201);
    } catch (error: any) {
        return c.json({error: error.message}, 400);
    }
}


export const login = async(c: Context) => {
    try {
        const {email, password} = await c.req.json();
        const {token,user} = await loginUser(email, password);
        return c.json({token,user}, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 400);
        
    }
}

//get a single user
export const getUsers = async(c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await getUsersService(limit);
        if(data == null || data.length === 0){
            return c.json({message: 'No users found'}, 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 400);
        
    }
}