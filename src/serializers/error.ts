import { ValidationError } from "joi";

type ErrorStatus = "error" | "fail";

type JSONError = {
  status: "error";
  message: string;
};

type JSONFail = {
  status: "fail";
  data: { [key: string]: string };
};

export class ErrorSerializer {
  static serialize(
    error: ValidationError | Error,
    status: ErrorStatus = "error"
  ): JSONError | JSONFail {
    const actions = {
      fail: () => ErrorSerializer.sendFail(error),
      error: () => ErrorSerializer.sendError(error),
    };

    return actions[status]();
  }

  private static sendFail(error: ValidationError | Error): JSONFail {
    const data: JSONFail["data"] = {};

    (error as ValidationError).details.forEach((detail) => {
      const key = detail.path.join("");

      data[key] = detail.message.replace(/"/g, "");
    });

    return {
      status: "fail",
      data,
    };
  }

  private static sendError(error: ValidationError | Error): JSONError {
    return {
      status: "error",
      message: error.message,
    };
  }
}
