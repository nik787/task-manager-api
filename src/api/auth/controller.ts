import type { Request, Response } from "express";

import { loginSchema, registerSchema } from "./schemas.js";
import { EmailAlreadyExistsError, loginService, registerService, UnauthorizedError } from "./service.js";

export const registerController = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: {
        message: "Validation error",
        code: "VALIDATION_ERROR",
        issues: result.error.issues,
      },
    });
  }

  try {
    const user = await registerService(result.data);

    return res.status(201).json({
      data: user,
    });
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return res.status(409).json({
        error: {
          message: error.message,
          code: "EMAIL_ALREADY_EXISTS",
        },
      });
    }

    console.error(error);

    return res.status(500).json({
      error: {
        message: "Internal server error",
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: {
        message: "Validation error",
        code: "VALIDATION_ERROR",
        issues: result.error.issues,
      },
    });
  }

  try {
    const authResult = await loginService(result.data);

    return res.status(200).json({
      data: authResult,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(401).json({
        error: {
          message: error.message,
          code: "INVALID_CREDENTIALS",
        },
      });
    }

    console.error(error);

    return res.status(500).json({
      error: {
        message: "Internal server error",
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};

export const meController = async (req: Request, res: Response) => {
  const user = (req as any).user;

  return res.status(200).json({
    data: {
      user,
    },
  });
};