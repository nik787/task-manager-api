import * as z from "zod";

const User = z.object({
  id: z.number(),
  email: z.email(),
  passwordHash: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof User>;