import Joi from "joi";

import { HTTPStatus, Middleware } from "@interfaces/shared";
import { UserCreateInput } from "@models/user";

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(8).required(),
});

export const validateCreateUser: Middleware = (req, res, next) => {
  const { name, email, password } = req.body as UserCreateInput;
  const { error } = createUserSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );

  if (error) {
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json(error.details);
  }

  return next();
};
