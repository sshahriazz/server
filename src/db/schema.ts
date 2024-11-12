import { sql } from 'drizzle-orm'
import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

export const tasks = sqliteTable('tasks', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  done: int('done', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
})

export const selectTasks = createSelectSchema(tasks)
export const insertTask = createInsertSchema(tasks, {
  name: (x) => x.name.min(1).max(255),
})
  .required({
    done: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
export const patchTask = insertTask.partial()
