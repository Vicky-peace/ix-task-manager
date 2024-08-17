import { Hono } from "hono";
import { createInvitationController,updateInvitationController,deleteInvitationController,getAllInvitationsController, getInvitationByIdController } from "./invitations.controller";

export const invitationsRouter = new Hono();

invitationsRouter.post('/invitations', createInvitationController);
invitationsRouter.put('/invitations/:id', updateInvitationController);
invitationsRouter.delete('/invitations/:id', deleteInvitationController);   
invitationsRouter.get('/invitations/:id', getInvitationByIdController);
invitationsRouter.get('/invitations', getAllInvitationsController);