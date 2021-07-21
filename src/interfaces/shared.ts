import { NextFunction, Request, Response } from "express";

export enum HTTPStatus {
  OK = 200,
  CREATED = 201,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
