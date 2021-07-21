import Joi from "joi";

import { HTTPStatus, Middleware } from "@interfaces/shared";
import { User, UserCreateInput } from "@models/user";

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(8).required(),
});

export const validateCreateUser: Middleware = async (req, res, next) => {
  const { name, email, password } = req.body as UserCreateInput;

  const { error } = createUserSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );

  if (error) {
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json(error.details);
  }

  const user = await User.findByEmail(email);

  if (user) {
    return res.status(HTTPStatus.CONFLICT).json({
      message: "User with that email already exists.",
    });
  }

  return next();
};
