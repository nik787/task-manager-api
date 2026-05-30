import bcrypt from "bcryptjs";

import type { RegisterInput } from "./schemas.js";
import { createUser, findUserByEmail } from "./repository.js";

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("Email already exists");
    this.name = "EmailAlreadyExistsError";
  }
}

export const registerService = async (input: RegisterInput) => {
  const email = input.email.toLowerCase().trim();

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new EmailAlreadyExistsError();
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  const user = await createUser(email, passwordHash);

  return user;
};

export const loginService = async () => {
  throw new Error("Not implemented");
};