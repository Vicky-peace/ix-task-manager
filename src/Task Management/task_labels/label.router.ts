import { Hono } from "hono";
import { createLabelController } from "./label.controller";

export const labelRouter = new Hono();

labelRouter.post('/labels', createLabelController);