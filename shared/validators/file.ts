import { z } from 'zod'

export const BaseFileSchema = z.object({
  file: z.instanceof(Blob),
  type: z.string(),
  size: z.number(),
  name: z.string()
})

export const FileSchema = z.object({
  files: z.array(z.number()).min(0)
})
