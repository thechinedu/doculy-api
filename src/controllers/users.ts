import { HTTPStatus, Middleware } from "@interfaces/shared";
import { User, UserCreateInput } from "@models/user";
import { rollbar } from "@root";
import { ErrorSerializer, UserSerializer } from "@serializers";

export const createUser: Middleware = async (req, res) => {
  const { name, email, password } = req.body as UserCreateInput;

  try {
    const user = await User.create({ name, email, password });
    res.status(HTTPStatus.CREATED).json(UserSerializer.serialize(user));
  } catch (err) {
    rollbar.error(err as unknown as Error, req, { level: "error" });
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json(ErrorSerializer.serialize(new Error("Failed to create new user")));
  }
};
