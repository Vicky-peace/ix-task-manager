import { db } from "../../drizzle/db";
import { Projects,TIProjects,TSProjects } from "../../drizzle/schema";
import { eq } from "drizzle-orm";



export const createProject = async (project: TIProjects) => {
    const newProject = await db.insert(Projects).values(project).returning().execute();
    return newProject[0];
};

export const updateProject = async (project_id: number, project: Partial<TIProjects>) => {
await db.update(Projects).set(project).where(eq(Projects.project_id, project_id)).execute();
return 'Project updated successfully';
}

export const deleteProject = async (project_id: number) => {
    await db.delete(Projects).where(eq(Projects.project_id, project_id)).execute();
    return 'Project deleted successfully';
}

export const getProjectById = async (project_id: number): Promise<TSProjects | undefined> => {
    return await db.query.Projects.findFirst({
        where: eq(Projects.project_id, project_id)
    });
};


export const getAllProjects = async (limit?: number): Promise<TSProjects[] | null> => {
 if(limit){
    return await db.query.Projects.findMany({limit: limit})
 }
 return await db.query.Projects.findMany();
}