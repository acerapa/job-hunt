import Joi from "joi";

export const isEmail = (email: string): Boolean => {
  const EmailSchema = Joi.object({
    email: Joi.string().email(),
  });

  const { error } = EmailSchema.validate({ email });

  return error ? false : true;
};

export const UserCreationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})
