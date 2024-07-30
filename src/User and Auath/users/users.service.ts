import { db } from "../../drizzle/db";
import { Users, UserRoles, Roles,TIUsers, TSUsers } from "../../drizzle/schema";
import { sql } from "drizzle-orm";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { eq } from "drizzle-orm";
import { registerSchema,loginSchema } from "../../validator";

// User type
type User = {
    user_id?: number;
    username: string;
    email: string;
    password: string;
};

const secret = process.env.SECRET;
const expiresIn = process.env.EXPIRESIN;



export const registerUser = async (user: User) => {
    registerSchema.parse(user);

    //check if user already exists
    const existingUser = await db.select().from(Users).where(eq(Users.email, user.email)).execute();

    if(existingUser.length > 0){
        throw new Error("User already exists");
    }


    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Create user
    const newUser = await db.insert(Users).values({
        ...user,
        password: hashedPassword,
    }).returning({ id: Users.user_id }).execute();

    const userId = newUser[0].id;

    // Insert default role for the user
    const newRole = await db.insert(Roles).values({
        role_name: 'user',
        permissions: ''
    }).returning({ id: Roles.role_id }).execute();

    const roleId = newRole[0].id;

    try {
        await db.insert(UserRoles).values({
            user_id: userId,
            role_id: roleId
        }).execute();

        return 'User created successfully';
    } catch (err) {
        throw new Error('Registration failed. Please try again later.');
    }
};