import type { ZodSchema } from './jsonContent'
import oneOf from './one-of'

const jsonContentOneOf = <T extends ZodSchema>(
  schemas: T[],
  description: string,
) => {
  return {
    content: {
      'application/json': {
        schema: {
          oneOf: oneOf(schemas),
        },
      },
    },
    description,
  }
}

export default jsonContentOneOf
