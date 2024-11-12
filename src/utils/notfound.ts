import HTTP_STATUS from "@/config/statusCodes";
import type { NotFoundHandler } from "hono";

const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${"Requested"} - ${c.req.path} url not found`,
    },
    { status: HTTP_STATUS.NOT_FOUND }
  );
};

export default notFound;
