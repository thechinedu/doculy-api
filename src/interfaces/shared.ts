import { NextFunction, Request, Response } from "express";

export enum HTTPStatus {
  OK = 200,
  CREATED = 201,
  UNPROCESSABLE_ENTITY = 422,
}

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
