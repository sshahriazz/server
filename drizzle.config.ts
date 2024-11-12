import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import appEnv from "./src/config/env";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: appEnv.TURSO_DATABASE_URL,
    authToken: appEnv.TURSO_AUTH_TOKEN,
  },
});
