type Env = "development" | "production" | "test";

const isValidEnv = (v: string): v is Env =>
  v === "development" || v === "production" || v === "test";

const getEnv = (): Env => {
  const e = process.env.NODE_ENV;
  if (!e) {
    return "development";
  } else if (isValidEnv(e)) {
    return e;
  } else {
    return "development";
  }
};

export const env: Env = getEnv();
