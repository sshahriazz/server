import * as routes from "./task.routes";
import * as handlers from "./task.handlers";
import { createRouter } from "@/core/create-app";

const taskRouter = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.single, handlers.single)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default taskRouter;
