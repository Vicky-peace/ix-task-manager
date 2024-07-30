import { Hono } from "hono";
import {register,login} from './users.controllers';

export const userRouter = new Hono();

userRouter.post('/register',register);
userRouter.post('/login',login);