import { Global } from "./src/interfaces/shared";
import { db } from "./src/utils";

export default async (): Promise<void> => {
  console.log("Tearing down");
  (global as Global).__SERVER__.close();
  db.$disconnect();
};
