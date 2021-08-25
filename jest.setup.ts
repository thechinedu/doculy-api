import { Global } from "./src/interfaces/shared";
import { app } from "./src/index";
import axios from "axios";

const { PORT } = process.env;

export const req = axios.create({
  baseURL: `http://localhost:${PORT}`,
  headers: { "Content-Type": "application/json" },
  validateStatus: (status) => status < 500,
});

export default async (): Promise<void> => {
  console.log("setting up");
  (global as Global).__SERVER__ = app.listen(PORT);
};
