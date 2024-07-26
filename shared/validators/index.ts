import { z, ZodError, ZodSchema, typeToFlattenedError } from 'zod'
import { isEmptyObject } from '../helpers/index.js';
export * from './user.js'

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
  errors: Record<string, any> | string | null
}

export const validate = <Data>(
  schema: ZodSchema,
  data: Data
): ValidateReturnType<Data> => {
  const rtn: Partial<ValidateReturnType<Data>> = {}

  try {
    const result = schema.parse(data)
    rtn.data = result
    rtn.valid = true
  } catch (e) {
    const err = (e as ZodError)
    const flattenedError = err.flatten()
    if (flattenedError.formErrors.length) {      
      rtn.errors = flattenedError.formErrors[0]
    } else {
      const setupError: Record<string, any> = {}
      Object.keys(flattenedError.fieldErrors)
        .forEach(key => {
          setupError[key] = Array.isArray(flattenedError.fieldErrors[key]) &&
                            flattenedError.fieldErrors[key].length ?
                            flattenedError.fieldErrors[key][0] : ''
        })
      rtn.errors = setupError
    }
    rtn.valid = false
  }

  return rtn as ValidateReturnType<Data>
}
