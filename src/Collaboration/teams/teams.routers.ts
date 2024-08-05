 import { Hono } from "hono";
 import { createTeamController, updateTeamController,deleteTeamController,getTeamByIdController, getAllTeamsController} from './teams.controllers';
 import { zValidator } from "@hono/zod-validator";
 import { TeamsSchema } from "../../validator";


 export const teamsRouter = new Hono();

 teamsRouter.post('/teams', zValidator('json', TeamsSchema) ,createTeamController);
 teamsRouter.put('/teams/:id', zValidator('json', TeamsSchema) ,updateTeamController);
 teamsRouter.delete('/teams/:id', deleteTeamController);
 teamsRouter.get('/teams/:id', getTeamByIdController);
 teamsRouter.get('/teams', getAllTeamsController);