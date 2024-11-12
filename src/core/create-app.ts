import { OpenAPIHono } from '@hono/zod-openapi'
import { pinoLogger } from 'hono-pino'
import pino from 'pino'
import pretty from 'pino-pretty'
import { requestId } from 'hono/request-id'
import type { IAppBindings } from '@/types'
import defaultHook from '@/middlewares/defaultHook'
import { serveEmojiFavicon } from '@/favicon'
import notFound from '@/middlewares/notfound'
import onError from '@/middlewares/onError'
import appEnv from '@/config/env'

export function createRouter() {
  return new OpenAPIHono<IAppBindings>({
    strict: false,
    defaultHook: defaultHook,
  })
}

export default function createApp() {
  const app = createRouter()

  app
    .use(serveEmojiFavicon('🦄'))
    .use(
      requestId({
        generator: () => crypto.randomUUID(),
      }),
    )
    .use(
      pinoLogger({
        pino: pino(
          {
            level: appEnv.LOG_LEVEL || 'info',
          },
          appEnv.NODE_ENV === 'production' ? undefined : pretty(),
        ),
        http: { responseTime: true, referRequestIdKey: 'requestId' },
      }),
    )

  app.notFound(notFound)
  app.onError(onError)

  return app
}
