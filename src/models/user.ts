import type { User as UserType } from "@prisma/client";

import { db, hashPassword } from "@utils";

export type UserCreateInput = {
  name: string;
  email: string;
  password: string;
};

const userSelectProperties: Record<keyof UserType, boolean> = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  passwordHash: false,
};

export class User {
  static async create({ name, email, password }: UserCreateInput) {
    return db.user.create({
      data: {
        name,
        email,
        passwordHash: await hashPassword(password),
      },

      select: userSelectProperties,
    });
  }
}
