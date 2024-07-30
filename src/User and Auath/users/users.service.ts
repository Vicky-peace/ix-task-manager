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



export const loginUser = async (email: string, password: string) => {
    loginSchema.parse({email, password});

    const users = await db.select().from(Users).where(eq(Users.email, email)).execute();


   
    if (users.length === 0) {
        throw new Error('User not found! Try Again');
    }
    const user = users[0];

    //fetch users password
    const auths = await db.select().from(Users).where(eq(Users.user_id, user.user_id)).execute();

    if(auths.length === 0){
        throw new Error('User not found! Try Again');
    }

    const auth = auths[0];

    //validate the provided password
    const isPasswordValid = await bcrypt.compare(password, auth.password);

    if(!isPasswordValid){
        throw new Error('Invalid credentials try again');
    }

    //fetch the users role
    const usersRole = await db.select({role_name: Roles.role_name})
    .from(UserRoles)
    .innerJoin(Roles, eq(UserRoles.role_id, Roles.role_id))
    .where(eq(UserRoles.user_id, user.user_id))
    .execute();
    

    if (usersRole.length === 0) {
        throw new Error('User role not found!');
    }
    
    const role = usersRole[0].role_name;
    //create a jwt token
    const token = jwt.sign({id: user.user_id, email: user.email, role}, secret!, {expiresIn});
    return {token, user}
};