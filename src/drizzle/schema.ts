import {pgTable, serial, varchar,text, integer, boolean, timestamp,decimal, pgEnum} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
export const roleEnum = pgEnum('role', ['admin', 'user']);
export const taskStatusEnum = pgEnum('task_status', ['Pending', 'In Progress', 'Completed']);
export const teamRoleEnum = pgEnum('team_role', ['Member', 'Leader']);


//Users Table
export const Users = pgTable('users', {
    user_id: serial('user_id').primaryKey(),
    username: varchar('full_name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull(),
    password: varchar('password', {length: 255}).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
})


//Session Table
export const Session = pgTable('session', {
    session_id: serial('session_id').primaryKey(),
    user_id: integer('user_id').references(()=> Users.user_id,{onDelete: 'cascade'}),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
})

// Roles Table
export const Roles = pgTable('roles', {
    role_id: serial('role_id').primaryKey(),
    role_name:  roleEnum('role').default('user'),
    permissions: text('permissions'),
});

// User Roles Table
export const UserRoles = pgTable('user_roles', {
    user_id: integer('user_id').notNull().references(() => Users.user_id),
    role_id: integer('role_id').notNull().references(() => Roles.role_id),
});

// Projects Table
export const Projects = pgTable('projects', {
    project_id: serial('project_id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    owner_id: integer('owner_id').notNull().references(() => Users.user_id, { onDelete: 'cascade' }),
});

// Tasks Table
export const Tasks = pgTable('tasks', {
    task_id: serial('task_id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    due_date: timestamp('due_date'),
    status: taskStatusEnum('task_status').notNull().default('Pending'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    project_id: integer('project_id').notNull().references(() => Projects.project_id, { onDelete: 'cascade' }),
    assigned_to: integer('assigned_to').references(() => Users.user_id, { onDelete: 'cascade' }),
});

// Task Comments Table
export const TaskComments = pgTable('task_comments', {
    comment_id: serial('comment_id').primaryKey(),
    task_id: integer('task_id').notNull().references(() => Tasks.task_id, { onDelete: 'cascade' }),
    user_id: integer('user_id').notNull().references(() => Users.user_id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    created_at: timestamp('created_at').defaultNow(),
});

// Task Labels Table
export const TaskLabels = pgTable('task_labels', {
    label_id: serial('label_id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    color: varchar('color', { length: 7 }).notNull(), // Hex color code
});


// Task Labels Mapping Table
export const TaskLabelsMapping = pgTable('task_labels_mapping', {
    task_id: integer('task_id').notNull().references(() => Tasks.task_id, { onDelete: 'cascade' }),
    label_id: integer('label_id').notNull().references(() => TaskLabels.label_id, { onDelete: 'cascade' }),
});

// Task Attachments Table
export const TaskAttachments = pgTable('task_attachments', {
    attachment_id: serial('attachment_id').primaryKey(),
    task_id: integer('task_id').notNull().references(() => Tasks.task_id, { onDelete: 'cascade' }),
    file_path: varchar('file_path', { length: 255 }).notNull(),
    file_name: varchar('file_name', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
});

// Teams Table
export const Teams = pgTable('teams', {
    team_id: serial('team_id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    owner_id: integer('owner_id').notNull().references(() => Users.user_id, { onDelete: 'cascade' }),
});

// Team Members Table
export const TeamMembers = pgTable('team_members', {
    user_id: integer('user_id').notNull().references(() => Users.user_id, { onDelete: 'cascade' }),
    team_id: integer('team_id').notNull().references(() => Teams.team_id, { onDelete: 'cascade' }),
    role: teamRoleEnum('team_role').default('Member'),
});

// Invitations Table
export const Invitations = pgTable('invitations', {
    invitation_id: serial('invitation_id').primaryKey(),
    team_id: integer('team_id').notNull().references(() => Teams.team_id, { onDelete: 'cascade' }),
    invited_user_id: integer('invited_user_id').notNull().references(() => Users.user_id, { onDelete: 'cascade' }),
    created_at: timestamp('created_at').defaultNow(),
});

// Notifications Table
export const Notifications = pgTable('notifications', {
    notification_id: serial('notification_id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => Users.user_id, { onDelete: 'cascade' }),
    message: text('message').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    read_at: timestamp('read_at'),
});

// Settings Table
export const Settings = pgTable('settings', {
    user_id: integer('user_id').notNull().references(() => Users.user_id, { onDelete: 'cascade' }),
    setting_name: varchar('setting_name', { length: 255 }).notNull(),
    setting_value: text('setting_value').notNull(),
});

// Analytics Table
export const Analytics = pgTable('analytics', {
    event_id: serial('event_id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => Users.user_id, { onDelete: 'cascade' }),
    event_type: varchar('event_type', { length: 50 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
});

//Users Table Relationsships

export const userRelations = relations(Users, ({many}) => ({
    sessions: many(Session),
    roles: many(UserRoles),
    projects: many(Projects),
    tasks: many(Tasks),
    taskComments: many(TaskComments),
    teamMembers: many(TeamMembers),
    invitations: many(Invitations),
    notifications: many(Notifications),
    settings: many(Settings),
    analytics: many(Analytics),
}));

//Sessions table Relations
export const sessionRelations = relations(Session, ({one}) => ({
    user: one(Users,{
        fields: [Session.user_id],
        references: [Users.user_id],
    })
}));

//Roles Table Relations
export const roleRelations = relations(Roles, ({many}) => ({
    users: many(UserRoles),
}));

// User Roles Table Relations
export const userRoleRelations = relations(UserRoles, ({one}) => ({
    user: one(Users,{
        fields: [UserRoles.user_id],
        references: [Users.user_id],
    }),
    role: one(Roles,{
        fields: [UserRoles.role_id],
        references: [Roles.role_id],
    })
}));

// Projects Table Relations
export const projectRelations = relations(Projects, ({one, many}) => ({
    owner: one(Users,{
        fields: [Projects.owner_id],
        references: [Users.user_id],
    }),
    tasks: many(Tasks),
}));

// Tasks Table Relations
export const taskRelations = relations(Tasks, ({one, many}) => ({
    project: one(Projects,{
        fields: [Tasks.project_id],
        references: [Projects.project_id],
    }),
    assignedTo: one(Users,{
        fields: [Tasks.assigned_to],
        references: [Users.user_id],
    }),
    taskComments: many(TaskComments),
    taskLabels: many(TaskLabelsMapping),
    taskAttachments: many(TaskAttachments),
}));
  
// Task Comments Table Relations
export const taskCommentRelations = relations(TaskComments, ({one}) => ({
    task: one(Tasks,{
        fields: [TaskComments.task_id],
        references: [Tasks.task_id],
    }),
    user: one(Users,{
        fields: [TaskComments.user_id],
        references: [Users.user_id],
    }),
}));

// Task Labels Table Relations
export const taskLabelRelations = relations(TaskLabels, ({many}) => ({
    tasks: many(TaskLabelsMapping),
}));

// Task Labels Mapping Table Relations
export const taskLabelMappingRelations = relations(TaskLabelsMapping, ({one}) => ({
    task: one(Tasks,{
        fields: [TaskLabelsMapping.task_id],
        references: [Tasks.task_id],
    }),
    label: one(TaskLabels,{
        fields: [TaskLabelsMapping.label_id],
        references: [TaskLabels.label_id],
    }),
}));

// Task Attachments Table Relations
export const taskAttachmentRelations = relations(TaskAttachments, ({one}) => ({
    task: one(Tasks,{
        fields: [TaskAttachments.task_id],
        references: [Tasks.task_id],
    }),
}));

// Teams Table Relations
export const teamRelations = relations(Teams, ({one, many}) => ({
    owner: one(Users,{
        fields: [Teams.owner_id],
        references: [Users.user_id],
    }),
    teamMembers: many(TeamMembers),
    invitations: many(Invitations),
}));

// Team Members Table Relations
export const teamMemberRelations = relations(TeamMembers, ({one}) => ({
    user: one(Users,{
        fields: [TeamMembers.user_id],
        references: [Users.user_id],
    }),
    team: one(Teams,{
        fields: [TeamMembers.team_id],
        references: [Teams.team_id],
    }),
}));

// Invitations Table Relations
export const invitationRelations = relations(Invitations, ({one}) => ({
    team: one(Teams,{
        fields: [Invitations.team_id],
        references: [Teams.team_id],
    }),
    invitedUser: one(Users,{
        fields: [Invitations.invited_user_id],
        references: [Users.user_id],
    }),
}));

// Notifications Table Relations
export const notificationRelations = relations(Notifications, ({one}) => ({
    user: one(Users,{
        fields: [Notifications.user_id],
        references: [Users.user_id],
    }),
}));

// Settings Table Relations
export const settingRelations = relations(Settings, ({one}) => ({
    user: one(Users,{
        fields: [Settings.user_id],
        references: [Users.user_id],
    }),
}));

// Analytics Table Relations
export const analyticsRelations = relations(Analytics, ({one}) => ({
    user: one(Users,{
        fields: [Analytics.user_id],
        references: [Users.user_id],
    }),
}));



// Users Table Types
export type TIUsers = typeof Users.$inferInsert;
export type TSUsers = typeof Users.$inferSelect;

// Sessions Table Types
export type TISessions = typeof Session.$inferInsert;
export type TSSessions = typeof Session.$inferSelect;

// Roles Table Types
export type TIRoles = typeof Roles.$inferInsert;
export type TSRoles = typeof Roles.$inferSelect;

// User Roles Table Types
export type TIUserRoles = typeof UserRoles.$inferInsert;
export type TSUserRoles = typeof UserRoles.$inferSelect;

// Projects Table Types
export type TIProjects = typeof Projects.$inferInsert;
export type TSProjects = typeof Projects.$inferSelect;

// Tasks Table Types
export type TITasks = typeof Tasks.$inferInsert;
export type TSTasks = typeof Tasks.$inferSelect;

// Task Comments Table Types
export type TITaskComments = typeof TaskComments.$inferInsert;
export type TSTaskComments = typeof TaskComments.$inferSelect;

// Task Labels Table Types
export type TITaskLabels = typeof TaskLabels.$inferInsert;
export type TSTaskLabels = typeof TaskLabels.$inferSelect;

// Task Labels Mapping Table Types
export type TITaskLabelsMapping = typeof TaskLabelsMapping.$inferInsert;
export type TSTaskLabelsMapping = typeof TaskLabelsMapping.$inferSelect;

// Task Attachments Table Types
export type TITaskAttachments = typeof TaskAttachments.$inferInsert;
export type TSTaskAttachments = typeof TaskAttachments.$inferSelect;

// Teams Table Types
export type TITeams = typeof Teams.$inferInsert;
export type TSTeams = typeof Teams.$inferSelect;

// Team Members Table Types
export type TITeamMembers = typeof TeamMembers.$inferInsert;
export type TSTeamMembers = typeof TeamMembers.$inferSelect;

// Invitations Table Types
export type TIInvitations = typeof Invitations.$inferInsert;
export type TSInvitations = typeof Invitations.$inferSelect;

// Notifications Table Types
export type TINotifications = typeof Notifications.$inferInsert;
export type TSNotifications = typeof Notifications.$inferSelect;

// Settings Table Types
export type TISettings = typeof Settings.$inferInsert;
export type TSSettings = typeof Settings.$inferSelect;

// Analytics Table Types
export type TIAnalytics = typeof Analytics.$inferInsert;
export type TSAnalytics = typeof Analytics.$inferSelect;
