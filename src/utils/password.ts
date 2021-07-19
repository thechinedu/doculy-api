import argon2 from "argon2";

export const hashPassword = (password: string): Promise<string> =>
  argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 15 * 1024,
  });

export const verifyPassword = async (
  passwordHash: string,
  password: string
): Promise<boolean> => {
  try {
    if (await argon2.verify(passwordHash, password)) return true;

    return false;
  } catch {
    return false;
  }
};
