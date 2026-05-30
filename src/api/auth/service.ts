import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { LoginInput, RegisterInput } from "./schemas.js";
import { createUser, findUserByEmail } from "./repository.js";
import { config } from "../../config/config.js";

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("Email already exists");
    this.name = "EmailAlreadyExistsError";
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Invalid email or password");
    this.name = "UnauthorizedError";
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

export const loginService = async (input: LoginInput) => {
  const email = input.email.toLowerCase().trim();
  const password = input.password;

  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    throw new UnauthorizedError();
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser.passwordHash
  );

  if (!isPasswordValid) {
    throw new UnauthorizedError();
  }

  const accessToken = jwt.sign(
    {
      sub: existingUser.id,
      email: existingUser.email,
    },
    config.jwtSecret,
    {
      expiresIn: "15m",
    }
  );

  return {
    accessToken,
  };
};