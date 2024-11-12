import appEnv from "@/config/env";
import HTTP_STATUS from "@/config/statusCodes";
import type { ErrorHandler } from "hono";

const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    "status" in err ? err.status : c.newResponse(null).status;
  const statusCode =
    currentStatus !== HTTP_STATUS.OK
      ? currentStatus
      : HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const env = c.env?.NODE_ENV || appEnv?.NODE_ENV;
  return c.json(
    {
      message: err.message,

      stack: env === "production" ? undefined : err.stack,
    },
    statusCode as any
  );
};

export default onError;
