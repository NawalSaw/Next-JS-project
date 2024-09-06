import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers")
  .max(20, "maximum length must be 20 characters")
  

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

  // example: /^[a-zA-Z0-9]+$/ this regex will validate that the string contains only letters and numbers
  // example: "hello world" => invalid
// example: "helloWorld" => valid
// example: "hello123" => valid
