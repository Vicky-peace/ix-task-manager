import { Hono } from "hono";
import {register,login,getUsers,getUserById,updateUser,deleteUser} from './users.controllers';

export const userRouter = new Hono();

userRouter.post('/register',register);
userRouter.post('/login',login);


userRouter.get('/users',getUsers)
userRouter.get('/users/:id',getUserById);

userRouter.put('/users/:id',updateUser);
userRouter.delete('/users/:id',deleteUser);