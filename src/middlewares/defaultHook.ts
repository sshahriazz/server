import HTTP_STATUS from '@/config/statusCodes'
import type { Hook } from '@hono/zod-openapi'
import type { Env } from 'hono'

const defaultHook: Hook<unknown, Env, string, unknown> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        error: result.error,
      },
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
    )
  }
  return c.json({ success: result.success })
}

export default defaultHook
