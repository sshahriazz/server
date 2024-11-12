import db from "src/db";
import type {
  CreateTaskRoute,
  ListTaskRoute,
  PatchTaskRoute,
  RemoveTaskRoute,
  SingleTaskRoute,
} from "./task.routes";
import type { AppRouteHandler } from "src/types";
import { tasks } from "src/db/schema";
import HTTP_STATUS from "src/config/statusCodes";
import { eq } from "drizzle-orm";

export const list: AppRouteHandler<ListTaskRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks, HTTP_STATUS.OK);
};

export const single: AppRouteHandler<SingleTaskRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const tasks = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!tasks) {
    return c.json(
      { message: `Task with id:${id} not found` },
      HTTP_STATUS.NOT_FOUND
    );
  }

  return c.json(tasks, HTTP_STATUS.OK);
};

export const create: AppRouteHandler<CreateTaskRoute> = async (c) => {
  const body = c.req.valid("json");
  const [task] = await db.insert(tasks).values(body).returning();
  return c.json(task, HTTP_STATUS.OK);
};

export const patch: AppRouteHandler<PatchTaskRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const body = c.req.valid("json");

  const [task] = await db
    .update(tasks)
    .set(body)
    .where(eq(tasks.id, id))
    .returning();

  if (!task) {
    return c.json(
      { message: `Task with id:${id} not found` },
      HTTP_STATUS.NOT_FOUND
    );
  }

  return c.json(task, HTTP_STATUS.OK);
};

export const remove: AppRouteHandler<RemoveTaskRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const result = await db.delete(tasks).where(eq(tasks.id, id));

  if (result.rowsAffected === 0) {
    return c.json(
      { message: `Task with id:${id} not found` },
      HTTP_STATUS.NOT_FOUND
    );
  }

  return c.body(null, HTTP_STATUS.NO_CONTENT);
};
