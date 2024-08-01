import { Hono } from "hono";
import { createProjectController, updateProjectController ,deleteProjectController, getProjectByIdController, getAllProjectsController} from "./project..controller";
import { zValidator } from "@hono/zod-validator";
import { projectSchema } from "../../validator";
export const projectRouter = new Hono();

projectRouter.post('/projects', zValidator('json',projectSchema ),createProjectController)
projectRouter.put('/projects/:id', zValidator('json', projectSchema),updateProjectController)
projectRouter.delete('/projects/:id', deleteProjectController)
projectRouter.get('/projects/:id', getProjectByIdController)
projectRouter.get('/projects', getAllProjectsController)