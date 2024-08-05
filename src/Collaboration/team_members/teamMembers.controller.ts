import { Context } from "hono";
import { createTeamMenber,updateTeamMenber,deleteTeamMenber,getTeamMenberById,getAllTeamMembers } from "./teamMembers.service";


export const createTeamMenberController = async (c:Context) =>{
    try {
        const teamMember = await c.req.json();
        const newTeamMember = await createTeamMenber(teamMember);
        if(!newTeamMember){
            return c.json({message: 'Team Member not created'}, 400);
        }
        return c.json(newTeamMember, 201);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const updateTeamMenberController = async (c: Context) =>{
    const teamMemberId = Number(c.req.param('id'));
    const teamMember = await c.req.json();
    try {
        const updatedTeamMember = await updateTeamMenber(teamMemberId, teamMember);
        if(!updatedTeamMember) return c.json({message: 'Team Member not updated'}, 400);
        return c.json({message: updatedTeamMember}, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const deleteTeamMenberController = async (c: Context) => {
    try {
        const teamMemberId = Number(c.req.param('id'));
        const deletedTeamMember = await deleteTeamMenber(teamMemberId);
        if(!deletedTeamMember) return c.json({message: 'Team Member not deleted'}, 400);
        return c.json({message: deletedTeamMember}, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const getTeamMenberByIdController = async (c: Context) => {
    try {
        const teamMemberId = Number(c.req.param('id'));
        const teamMember = await getTeamMenberById(teamMemberId);
        if(!teamMember) return c.json({message: 'Team Member not found'}, 404);
        return c.json(teamMember, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}

export const getAllTeamMembersController = async (c: Context) => {
    try {
        const teamMembers = await getAllTeamMembers();
        if(!teamMembers) return c.json({message: 'Team Members not found'}, 404);
        return c.json(teamMembers, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}