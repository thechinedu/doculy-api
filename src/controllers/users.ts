import { User, UserCreateInput } from "@models/user";
import { HTTPStatus, Middleware } from "@interfaces/shared";

export const createUser: Middleware = async (req, res) => {
  const { name, email, password } = req.body as UserCreateInput;

  try {
    const user = await User.create({ name, email, password });
    res.status(HTTPStatus.CREATED).json(user);
  } catch (err) {
    res
      .status(HTTPStatus.UNPROCESSABLE_ENTITY)
      .json([
        { message: "The email address is already in use by another account" },
      ]);
  }
};
