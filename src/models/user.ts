import type { User as UserType } from "@prisma/client";

import { db, hashPassword } from "@utils";

export type UserCreateInput = {
  name: string;
  email: string;
  password: string;
};

type UserObject = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
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
  static async create({
    name,
    email,
    password,
  }: UserCreateInput): Promise<UserObject> {
    return db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash: await hashPassword(password),
      },

      select: userSelectProperties,
    });
  }

  static async findByEmail(email: string): Promise<UserObject | null> {
    return db.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },

      select: userSelectProperties,
    });
  }
}
