import {Hono} from 'hono';
import "dotenv/config";
import {serve} from "@hono/node-server";
import {cors} from "hono/cors";

//routes
import { userRouter } from './User and Auath/users/users.router';
import { projectRouter } from './Task Management/projects/project.router';


const app = new Hono();

app.use('*',cors());

app.get('/',async(c)=>{
    return c.json({message: 'Welcome to my API'});
})

//routes
app.route('/', userRouter)
app.route('/', projectRouter)

serve({
    fetch: app.fetch,
    port: Number(process.env.PORT)
})

console.log(`Server is running on http://localhost:${process.env.PORT}`)