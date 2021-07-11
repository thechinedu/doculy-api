import express from "express";

import { createUser } from "@controllers/users";
import { validateCreateUser } from "@validators/users";

export const UserRouter = express.Router();

UserRouter.route("/").post(validateCreateUser, createUser);
