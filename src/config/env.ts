import { z, type ZodError } from 'zod'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

expand(config())

const EnvSchema = z
  .object({
    PORT: z.coerce.number().default(4444),
    LOG_LEVEL: z
      .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
      .default('info'),
    NODE_ENV: z.string().default('development'),
    TURSO_DATABASE_URL: z.string(),
    TURSO_AUTH_TOKEN: z.string().optional(),
  })
  .superRefine((input, ctx) => {
    if (
      input.NODE_ENV === 'production' &&
      (input.TURSO_AUTH_TOKEN === undefined || input.TURSO_AUTH_TOKEN === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'undefined',
        path: ['DATABASE_AUTH_TOKEN'],
        message: "Must be set when NODE_ENV is 'production'",
      })
    }
  })

// TODO: ADD Super refine from repo

export type Env = z.infer<typeof EnvSchema>

let appEnv: Env

try {
  appEnv = EnvSchema.parse(process.env)
} catch (e) {
  console.log(process.env)

  const error = e as ZodError
  console.error('Error parsing environment variables')
  console.error(error.flatten().fieldErrors)
  process.exit(1)
}

export default appEnv
