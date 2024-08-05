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

export  const projectSchema = z.object({
    project_id: z.number().int().optional(),
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    owner_id: z.number().int(),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
});

export const taskSchema = z.object({
    task_id: z.number().int().optional(),
    project_id: z.number().int(),
    assigned_to: z.number().int(),
    title: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    status: z.enum(['Pending', 'In Progress', 'Completed']).default('Pending'),
    due_date: z.string(),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
})

export const TeamsSchema = z.object({
    team_id: z.number().int().optional(),
    owner_id: z.number().int(),
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
})