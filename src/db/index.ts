import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import appEnv from 'src/config/env'
import * as schema from './schema'

const client = createClient({
    url: appEnv.TURSO_DATABASE_URL,
    authToken: appEnv.TURSO_AUTH_TOKEN,
})
const db = drizzle(client, {
    schema,
})

export default db
