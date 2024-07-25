import { z } from "zod";

export const createBetSchema = z.object({
  fixture: z.string({
    required_error: "Fixture is required",
  }),
  betChoice: z.string().optional(),
  date: z.string().datetime().optional(),
});
