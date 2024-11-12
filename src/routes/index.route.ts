import { createRoute, z } from '@hono/zod-openapi'

import jsonContent from '@/schema/jsonContent'
import { createRouter } from '@/core/create-app'
import HTTP_STATUS from '@/config/statusCodes'

const router = createRouter().openapi(
  createRoute({
    tags: ['Index'],
    method: 'get',
    path: '/',
    responses: {
      [HTTP_STATUS.OK]: jsonContent(
        z.object({ message: z.string() }),
        'Hello, World!',
      ),
    },
  }),
  (c) => {
    return c.json({ message: 'Hello, World!' }, HTTP_STATUS.OK)
  },
)

export default router
