import { User, UserCreateInput } from "@models/user";
import { HTTPStatus, Middleware } from "@interfaces/shared";
import { rollbar } from "@root";

export const createUser: Middleware = async (req, res) => {
  const { name, email, password } = req.body as UserCreateInput;

  try {
    const user = await User.create({ name, email, password });
    res.status(HTTPStatus.CREATED).json(user);
  } catch (err) {
    rollbar.error(err as unknown as Error, req, { level: "error" });
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).end();
  }
};
