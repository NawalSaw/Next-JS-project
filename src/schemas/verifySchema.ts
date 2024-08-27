import { z } from "zod";

const verifySchema = z.object({
  verifyCode: z
    .string()
    .min(6, "Verify code must be at least 6 characters")
    .max(6, "Verify code must be at most 6 characters"),
});
