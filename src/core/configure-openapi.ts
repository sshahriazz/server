import type { AppOpenApi } from "@/types";
import { apiReference } from "@scalar/hono-api-reference";
import pkg from "../../package.json";

export default function configureOpenApi(app: AppOpenApi) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: pkg.version,
      title: "My API",
    },
  });
  app.get(
    "/reference",
    apiReference({
      theme: "kepler",
      layout: "modern",
      defaultHttpClient: {
        clientKey: "fetch",
        targetKey: "javascript",
      },
      spec: {
        url: "/doc",
      },
    })
  );
}
