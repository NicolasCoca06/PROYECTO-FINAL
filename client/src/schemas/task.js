import { z } from "zod";

export const betSchema = z.object({
  fixture: z.string({
    required_error: "Fixture is required",
  }),
  betChoice: z.string({
    required_error: "BetChoice is required",
  }),
});
