import express from "express";
import morgan from "morgan";
import { router } from "~/routes";
import { env } from "~/env";

const port = process.env.PORT || 3000;

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env === "development" ? "dev" : "combined"));
app.disable("x-powered-by");
app.disable("etag");

app.listen(port, () => {
  console.debug(`Start server on http://localhost:${port}`);
});

app.use(router);
