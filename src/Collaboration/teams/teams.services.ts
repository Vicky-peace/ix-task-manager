import {db} from '../../drizzle/db';
import { Teams, TITeams, TSTeams } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

export const createTeam = async (team: TITeams) => {
    const newTeam = await db.insert(Teams).values(team).returning().execute();
    return newTeam[0];
}

export const updateTeam = async(team_id: number, team: Partial<TITeams>) => {
    await db.update(Teams).set(team).where(eq(Teams.team_id, team_id)).execute();
    return 'Team updated successfully';
}

export const deleteTeam = async (team_id: number) => {
    await db.delete(Teams).where(eq(Teams.team_id, team_id)).execute();
    return 'Team deleted successfully';
}

export const getTeamById = async (team_id: number): Promise<TSTeams | undefined> => {
    return await db.query.Teams.findFirst({
        where: eq(Teams.team_id, team_id)
    });
}

export const getAllTeams = async (limit?: number): Promise<TSTeams[] | null> => {
    if(limit){
        return await db.query.Teams.findMany({limit: limit});
    }
    return await db.query.Teams.findMany();
}