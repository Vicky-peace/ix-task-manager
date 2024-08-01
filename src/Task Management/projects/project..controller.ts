import { Context } from "hono";
import { createProject,updateProject, deleteProject,getAllProjects,getProjectById } from "./project.service";
import { parse } from "path";

export const createProjectController = async (c: Context) => {
  try {
    const project =  await c.req.json();
    const newProject = await createProject(project);
    if(!newProject) return c.json({message: 'Project not created'}, 404);
    return c.json(newProject);
  } catch (error: any) {
    return c.json({error: error.message}, 400)
  }
};

export const updateProjectController = async (c: Context) =>{
    try {
        const project_id = parseInt(c.req.param("id"));
    const project = await c.req.json();
    const message = await updateProject(project_id, project);
    if(!message) return c.json({message: 'Project not updated'}, 404);
    return c.json({message});
    } catch (error: any) {
        return c.json({error: error.message}, 400)
    }
}

export const deleteProjectController = async (c: Context) =>{
    try {
        const project_id = parseInt(c.req.param("id"));
    const message = await deleteProject(project_id);
    if(!message) return c.json({message: 'Project not deleted'}, 404);
    return c.json({message});
    } catch (error: any) {
        return c.json({error: error.message}, 400)
    }
}

export const getProjectByIdController = async (c: Context) =>{
    try {
        const project_id = parseInt(c.req.param("id"));
    const project = await getProjectById(project_id);
    if(!project) return c.json({message: 'Project not found'}, 404);
    return c.json(project);
    } catch (error: any) {
        return c.json({error: error.message}, 400)
    }
}

export const getAllProjectsController = async (c: Context) =>{
    try {
        const limit = parseInt(c.req.param("limit"));
    const projects = await getAllProjects(limit);
    if(!projects) return c.json({message: 'Projects not found'}, 404);
    return c.json(projects);
    } catch (error: any) {
        return c.json({error: error.message}, 400)
    }
}