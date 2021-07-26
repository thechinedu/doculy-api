import Joi, { ValidationError } from "joi";

import { HTTPStatus, Middleware } from "@interfaces/shared";
import { User, UserCreateInput } from "@models/user";
import { ErrorSerializer } from "@serializers";

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
    return res
      .status(HTTPStatus.UNPROCESSABLE_ENTITY)
      .json(ErrorSerializer.serialize(error, "fail"));
  }

  const user = await User.findByEmail(email);

  if (user) {
    const message = "User with that email already exists";
    const path = ["email"];
    const details = [{ path, message }];
    const userExistsError = new ValidationError("", details, null);

    return res
      .status(HTTPStatus.CONFLICT)
      .json(ErrorSerializer.serialize(userExistsError, "fail"));
  }

  return next();
};
