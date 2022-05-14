import express from "express";
import morgan from "morgan";
import { router } from "./routes";

const port = process.env.PORT || 3000;

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(import.meta.env.DEV ? "dev" : "combined"));
app.disable("x-powered-by");

app.listen(port, () => {
  console.info(`Start server on http://localhost:${port}`);
});

app.use(router);
