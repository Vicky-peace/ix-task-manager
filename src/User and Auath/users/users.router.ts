import { Hono } from "hono";
import {register,login,getUsers} from './users.controllers';

export const userRouter = new Hono();

userRouter.post('/register',register);
userRouter.post('/login',login);


userRouter.get('/users',getUsers)