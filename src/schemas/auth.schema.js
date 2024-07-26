import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
    phone : z
    .string({
      message: "Phone is not valid",
    })
    .min(10, {
      message: "Phone must be at least 10 characters",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  phone : z.string().min(10),
  password: z.string().min(6),
});
