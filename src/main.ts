import {Hono} from 'hono';
import "dotenv/config";
import {serve} from "@hono/node-server";
import {cors} from "hono/cors";

//routes
import { userRouter } from './User and Auath/users/users.router';
import { projectRouter } from './Task Management/projects/project.router';
import { taskRouter } from './Task Management/tasks/tasks.router';
import { commentsRouter } from './Task Management/task_comments/comments.router';


const app = new Hono();

app.use('*',cors());

app.get('/',async(c)=>{
    return c.json({message: 'Welcome to my API'});
})

//routes
app.route('/', userRouter)
app.route('/', projectRouter)
app.route('/', taskRouter)
app.route('/', commentsRouter)

serve({
    fetch: app.fetch,
    port: Number(process.env.PORT)
})

console.log(`Server is running on http://localhost:${process.env.PORT}`)