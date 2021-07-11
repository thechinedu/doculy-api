import { model } from "prisma-prime";

export const User = model("User", (t) => {
  t.id();
  t.timestamps();
  t.string("name");
  t.string("email", { unique: true });
  t.string("passwordHash");
});
