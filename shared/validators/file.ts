import { z } from 'zod'

export const FileSchema = z.object({
  files: z.array(z.instanceof(Blob)).min(0)
})
