import { createRoute, z } from "@hono/zod-openapi";
import { insertTask, patchTask, selectTasks } from "src/db/schema";

import HTTP_STATUS from "src/config/statusCodes";
import createErrorSchema from "@/schema/error.schema";

export const list = createRoute({
  path: "/tasks",
  tags: ["Tasks"],
  method: "get",

  responses: {
    [HTTP_STATUS.OK]: {
      content: {
        "application/json": {
          schema: z.array(selectTasks),
        },
      },
      description: "The list of Task",
    },
  },
});

export const single = createRoute({
  path: "/tasks/{id}",
  tags: ["Tasks"],
  method: "get",
  request: {
    params: z.object({
      id: z.coerce.number().openapi({
        description: "Task ID",
        param: {
          name: "id",
          in: "path",
        },
        example: 1,
      }),
    }),
  },

  responses: {
    [HTTP_STATUS.OK]: {
      content: {
        "application/json": {
          schema: selectTasks,
        },
      },
      description: "Requested tasks",
    },
    [HTTP_STATUS.NOT_FOUND]: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "Task not found",
            }),
          }),
        },
      },
      description: "Task not found",
    },
    [HTTP_STATUS.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(
            z.object({
              id: z.coerce.number().openapi({
                description: "Task ID",
                param: {
                  name: "id",
                  in: "path",
                },
                example: 1,
              }),
            })
          ),
        },
      },
      description: "Invalid Id error",
    },
  },
});

export const create = createRoute({
  path: "/tasks",
  tags: ["Tasks"],
  method: "post",
  request: {
    body: {
      content: {
        "application/json": {
          schema: insertTask,
        },
      },
      required: true,
      description: "Provide a task",
    },
  },
  responses: {
    [HTTP_STATUS.OK]: {
      content: {
        "application/json": {
          schema: selectTasks,
        },
      },
      description: "Created Task",
    },
    [HTTP_STATUS.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(insertTask),
        },
      },
      description: "Validation Error(s) in creating task",
    },
  },
});

export const patch = createRoute({
  path: "/tasks/{id}",
  tags: ["Tasks"],
  method: "patch",
  request: {
    params: z.object({
      id: z.coerce.number().openapi({
        description: "Task ID",
        param: {
          name: "id",
          in: "path",
        },
        example: 1,
      }),
    }),
    body: {
      content: {
        "application/json": {
          schema: patchTask,
        },
      },
      required: true,
      description: "Update a task",
    },
  },
  responses: {
    [HTTP_STATUS.OK]: {
      content: {
        "application/json": {
          schema: selectTasks,
        },
      },
      description: "Updated Task",
    },
    [HTTP_STATUS.NOT_FOUND]: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "Task not found",
            }),
          }),
        },
      },
      description: "Task not found",
    },
    [HTTP_STATUS.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(
            z
              .object({
                id: z.coerce.number().openapi({
                  description: "Task ID",
                  param: {
                    name: "id",
                    in: "path",
                  },
                  example: 1,
                }),
              })
              .or(patchTask)
          ),
        },
      },
      description: "Invalid Id error / Validation Error(s) in updating task",
    },
  },
});

export const remove = createRoute({
  path: "/tasks/{id}",
  tags: ["Tasks"],
  method: "delete",
  request: {
    params: z.object({
      id: z.coerce.number().openapi({
        description: "Task ID",
        param: {
          name: "id",
          in: "path",
        },
        example: 1,
      }),
    }),
    body: {
      content: {
        "application/json": {
          schema: patchTask,
        },
      },
      required: true,
      description: "Update a task",
    },
  },
  responses: {
    [HTTP_STATUS.NO_CONTENT]: {
      description: "Task Deleted",
    },
    [HTTP_STATUS.NOT_FOUND]: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "Task not found",
            }),
          }),
        },
      },
      description: "Task not found",
    },
    [HTTP_STATUS.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(
            z.object({
              id: z.coerce.number().openapi({
                description: "Task ID",
                param: {
                  name: "id",
                  in: "path",
                },
                example: 1,
              }),
            })
          ),
        },
      },
      description: "Invalid Id error / Validation Error(s) in updating task",
    },
  },
});

export type ListTaskRoute = typeof list;
export type CreateTaskRoute = typeof create;
export type SingleTaskRoute = typeof single;
export type PatchTaskRoute = typeof patch;
export type RemoveTaskRoute = typeof remove;
