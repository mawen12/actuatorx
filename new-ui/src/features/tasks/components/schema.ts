import { z } from 'zod'

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  group: z.string(),
  source: z.string(),
  pattern: z.string(),
  isConfiged: z.boolean().optional(),
  timezone: z.string(),
  firstLogLine: z.string().optional(),
  lastLogLine: z.string().optional(),
})

export type Task = z.infer<typeof taskSchema>