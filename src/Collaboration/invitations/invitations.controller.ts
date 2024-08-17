import { Context } from "hono";
import { createInvitation, updateInvitation, deleteInvitation, getInvitationById,getAllInvitations } from "./invitations.service";

export const createInvitationController = async(c: Context) => {
    try {
        const invite = await c.req.json();
    const newInvite = await createInvitation(invite);
    if(!newInvite) return c.json({message: 'Invitation not created'}, 400);
    return c.json(newInvite, 201);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
        
    }

}

export const updateInvitationController = async(c: Context) => {
    try {
        const inviteId = Number(c.req.param('id'));
    const invite = await c.req.json();
    const updatedInvite = await updateInvitation(inviteId, invite);
    if(!updatedInvite) return c.json({message: 'Invitation not updated'}, 400);
    return c.json({message: updatedInvite}, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
        
    }

}

export const deleteInvitationController = async(c: Context) => {
    try {
        const inviteId = Number(c.req.param('id'));
    const deletedInvite = await deleteInvitation(inviteId);
    if(!deletedInvite) return c.json({message: 'Invitation not deleted'}, 400);
    return c.json({message: deletedInvite}, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
        
    }
}

export const getInvitationByIdController = async(c: Context) => {
    try {
        const inviteId = Number(c.req.param('id'));
    const invite = await getInvitationById(inviteId);
    if(!invite) return c.json({message: 'Invitation not found'}, 404);
    return c.json(invite, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)
        
    }
}

export const getAllInvitationsController = async(c: Context) => {
    try {
        const invites = await getAllInvitations();
    if(!invites) return c.json({message: 'Invitations not found'}, 404);
    return c.json(invites, 200);
    } catch (error: any) {
        return c.json({error: error.message}, 500)  
    }
}