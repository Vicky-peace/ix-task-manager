import { Hono } from "hono";
import { createTeamMenberController,updateTeamMenberController,deleteTeamMenberController,getTeamMenberByIdController, getAllTeamMembersController } from "./teamMembers.controller";

export const teamMembersRouter = new Hono();

teamMembersRouter.post('/team_members', createTeamMenberController);
teamMembersRouter.put('/team_members/:id', updateTeamMenberController);
teamMembersRouter.delete('/team_members/:id', deleteTeamMenberController);
teamMembersRouter.get('/team_members/:id', getTeamMenberByIdController);
teamMembersRouter.get('/team_members', getAllTeamMembersController);