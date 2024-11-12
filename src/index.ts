import { serve } from '@hono/node-server'
import Env from './config/env'
import app from './core/app'

const port = Env.PORT
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
