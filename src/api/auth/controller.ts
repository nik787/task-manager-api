import type { Request, Response } from "express";

import { registerSchema } from "./schemas.js";
import { EmailAlreadyExistsError, registerService } from "./service.js";

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

export const loginController = async (_req: Request, res: Response) => {
  return res.status(501).json({
    error: {
      message: "Login is not implemented yet",
      code: "NOT_IMPLEMENTED",
    },
  });
};