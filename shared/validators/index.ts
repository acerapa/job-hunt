import { z, ZodError, ZodSchema } from 'zod'

export const UserCreationSchema = z.object({
  username: z.string().min(2, "Username is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must have aleast 6 characters")
})

export const isEmail = (email: string): boolean => {
  const EmailSchema = z.string().email();
  let rtn:boolean = false;
  try {
    EmailSchema.parse(email)
    rtn = true
  } catch (e) {
    rtn = false
  }
  return rtn;
}

export type ValidateReturnType<Data> = {
  valid: boolean,
  data: Data | null,
  errors: ZodError | null
}

export const validate = <Data>(
  schema: ZodSchema,
  data: Data,
  showError: boolean = false
): ValidateReturnType<Data> => {
  const rtn: Partial<ValidateReturnType<Data>> = {}

  try {
    const result = schema.parse(data)
    rtn.data = result
    rtn.valid = true
  } catch (e) {
    rtn.errors = (e as ZodError)
    rtn.valid = false
  }

  return rtn as ValidateReturnType<Data>
}
