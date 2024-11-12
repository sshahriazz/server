import HTTP_STATUS from '@/config/statusCodes'
import type { Hook } from '@hono/zod-openapi'

const defaultHook: Hook<any, any, any, any> = (result, c) => {
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
