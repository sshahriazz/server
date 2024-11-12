import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import type { PinoLogger } from 'hono-pino'

export interface IAppBindings {
  Variables: { logger: PinoLogger }
}

export type AppOpenApi = OpenAPIHono<IAppBindings>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  IAppBindings
>
