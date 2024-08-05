import { db } from "../../drizzle/db";
import { eq } from "drizzle-orm";
import { Invitations, TIInvitations, TSInvitations } from "../../drizzle/schema";

export const createInvitation = async (invitation: TIInvitations) => {
    const newInvitation = await db.insert(Invitations).values(invitation).returning().execute();
    return newInvitation[0];
}

export const updateInvitation = async (invitation_id: number, invitation: Partial<TIInvitations>) => {
    await db.update(Invitations).set(invitation).where(eq(Invitations.invitation_id, invitation_id)).execute();
    return 'Invitation updated successfully';
}

export const deleteInvitation = async (invitation_id: number) => {
    await db.delete(Invitations).where(eq(Invitations.invitation_id, invitation_id)).execute();
    return 'Invitation deleted successfully';
}

export const getInvitationById = async (invitation_id: number): Promise<TSInvitations | undefined> => {
    return await db.query.Invitations.findFirst({
        where: eq(Invitations.invitation_id, invitation_id)
    });
}

export const getAllInvitations = async (limit?: number): Promise<TSInvitations[] | null> => {
    if(limit){
        return await db.query.Invitations.findMany({limit: limit});
    }
    return await db.query.Invitations.findMany();
}