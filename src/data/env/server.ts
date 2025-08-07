import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    AZURE_RESOURCE_NAME: z.string().min(1),
    AZURE_API_KEY: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GA_TRACKING_ID: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
