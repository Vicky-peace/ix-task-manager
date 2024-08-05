import { db } from "../../drizzle/db";
import { eq } from "drizzle-orm";
import { TeamMembers, TITeamMembers,TSTeamMembers } from "../../drizzle/schema";

export const createTeamMenber = async (teamMember: TITeamMembers) => {
    const newTeamMember = await db.insert(TeamMembers).values(teamMember).returning().execute();
    return newTeamMember[0];
}

export const updateTeamMenber = async (team_member_id: number, teamMember: Partial<TITeamMembers>) => {
    await db.update(TeamMembers).set(teamMember).where(eq(TeamMembers.user_id, team_member_id)).execute();
    return 'Team Member updated successfully';
}

export const deleteTeamMenber = async (team_member_id: number) => {
    await db.delete(TeamMembers).where(eq(TeamMembers.user_id, team_member_id)).execute();
    return 'Team Member deleted successfully';
}

export const getTeamMenberById = async (team_member_id: number): Promise<TSTeamMembers | undefined> => {
    return await db.query.TeamMembers.findFirst({
        where: eq(TeamMembers.user_id, team_member_id)
    });
}

export const getAllTeamMembers = async (limit?: number): Promise<TSTeamMembers[] | null> => {
    if(limit){
        return await db.query.TeamMembers.findMany({limit: limit});
    }
    return await db.query.TeamMembers.findMany();
}