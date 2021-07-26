import { UserObject } from "@models/user";

type JSONSuccess = {
  status: "success";
  data: {
    user: UserObject;
  };
};

export class UserSerializer {
  static serialize(user: UserObject): JSONSuccess {
    return {
      status: "success",
      data: {
        user,
      },
    };
  }
}
