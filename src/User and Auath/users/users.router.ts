import { Hono } from "hono";
import {register} from './users.controllers';

export const userRouter = new Hono();

userRouter.post('/register',register);