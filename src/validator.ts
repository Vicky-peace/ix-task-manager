import {z} from 'zod';

export const registerSchema = z.object({
    user_id: z.number().int().optional(),
    username: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    role: z.enum(['user', 'admin']).default('user'),
})

export const loginSchema = z.object({
    user_id: z.number().int().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(255),
})