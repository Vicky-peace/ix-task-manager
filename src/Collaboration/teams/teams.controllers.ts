import { Context } from "hono";
import { createTeam,updateTeam,deleteTeam,getTeamById,getAllTeams } from "./teams.services";

export const createTeamController = async (c:Context) =>{
    try {
        const team = await c.req.json();
        const newTeam = await createTeam(team);
        if(!newTeam){
            return c.json({message: 'Team not created'}, 400);
        }
        return c.json(newTeam, 201);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const updateTeamController = async (c: Context) =>{
    const teamId = Number(c.req.param('id'));
    const team = await c.req.json();
    try {
        const updatedTeam = await updateTeam(teamId, team);
        if(!updatedTeam) return c.json({message: 'Team not updated'}, 400);
        return c.json({message: updatedTeam}, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const deleteTeamController = async (c: Context) => {
    try {
        const teamId = Number(c.req.param('id'));
        const deletedTeam = await deleteTeam(teamId);
        if(!deletedTeam) return c.json({message: 'Team not deleted'}, 400);
        return c.json({message: deletedTeam}, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}


export const getTeamByIdController = async (c: Context) => {
    try {
        const teamId = Number(c.req.param('id'));
        const team = await getTeamById(teamId);
        if(!team) return c.json({message: 'Team not found'}, 404);
        return c.json(team, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const getAllTeamsController = async (c: Context) => {
    try {
        const teams = await getAllTeams();
        if(!teams) return c.json({message: 'Teams not found'}, 404);
        return c.json(teams, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}