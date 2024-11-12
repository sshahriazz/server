import { OpenAPIHono } from "@hono/zod-openapi";
import { pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";
import { requestId } from "hono/request-id";
import type { AppBindings } from "@/types";
import defaultHook from "@/utils/defaultHook";
import { serveEmojiFavicon } from "@/favicon";
import notFound from "@/utils/notfound";
import onError from "@/utils/onError";
import appEnv from "@/config/env";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();

  app
    .use(serveEmojiFavicon("🦄"))
    .use(
      requestId({
        generator: () => crypto.randomUUID(),
      })
    )
    .use(
      pinoLogger({
        pino: pino(
          {
            level: appEnv.LOG_LEVEL || "info",
          },
          appEnv.NODE_ENV === "production" ? undefined : pretty()
        ),
        http: { responseTime: true, referRequestIdKey: "requestId" },
      })
    );

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
