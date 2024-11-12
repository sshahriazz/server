import appEnv from '@/config/env'
import HTTP_STATUS from '@/config/statusCodes'
import type { ErrorHandler } from 'hono'

const onError: ErrorHandler = (err, c) => {
    const currentStatus = 'status' in err ? (err.status as number) : c.newResponse(null).status

    const statusCode = (
        currentStatus !== HTTP_STATUS.OK ? currentStatus : HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) as 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500

    const env = Boolean(c.env?.NODE_ENV) || appEnv?.NODE_ENV
    return c.json(
        {
            message: err.message,

            stack: env === 'production' ? undefined : err.stack,
        },
        statusCode
    )
}

export default onError
