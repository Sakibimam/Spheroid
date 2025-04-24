import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_LIGHTHOUSE_API_KEY: z.string().optional(),
  },

  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_LIGHTHOUSE_API_KEY: process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
  },
})

export default env
